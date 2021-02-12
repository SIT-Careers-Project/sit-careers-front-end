import { useForm } from 'react-hook-form'
import React, { useContext, useEffect, useState } from 'react'
import { CompanyFormSchema } from '../services/validationSchema'
import { CoreModal } from '../../../core/components/Modal'
import { Observer } from 'mobx-react-lite'
import { companyFormPageContext } from '../contexts/company_form_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar } from '../../../core/components/Avatar'
import { InputLabel } from '@material-ui/core'
import MainInfoForm from '../components/FormCreate/main-info'
import DetailInfoForm from '../components/FormCreate/detail-info'
import ContractInfoForm from '../components/FormCreate/contract-info'
import LocationInfoForm from '../components/FormCreate/location-info'
import CompanyDateInfoForm from '../components/FormCreate/company-date-info'
import MouInfoForm from '../components/FormCreate/mou-info'

const CompanyForm = () => {
  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(CompanyFormSchema)
  })
  const context = useContext(companyFormPageContext)
  const coreModalContext = useContext(modalContext)

  const [file, setFile] = useState(null)

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
  }, [context, coreModalContext])

  return (
    <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
      <div className="px-6 pt-6">
        <p className="font-semibold font-prompt text-heading-6">ข้อมูลบริษัท</p>
        <button className="border-none focus:outline-none">
          <InputLabel htmlFor="company_logo_image_label">
            <Avatar imgSrc={file} className="mt-5 cursor-pointer bg-grey-100" />
          </InputLabel>
          <input
            id="company_logo_image_label"
            type="file"
            name="company_logo_image"
            className="hidden"
            ref={register}
            onChange={(event) => setFile(URL.createObjectURL(event?.target?.files[0]))}
          />
        </button>
      </div>
      <MainInfoForm register={register} errors={errors} control={control} />
      <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
      <DetailInfoForm errors={errors} control={control} />
      <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
      <ContractInfoForm register={register} errors={errors} />
      <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
      <LocationInfoForm register={register} errors={errors} />
      <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
      <CompanyDateInfoForm register={register} errors={errors} control={control} />
      <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
      <MouInfoForm register={register} errors={errors} />
      <Observer>
        {() => (
          <>
            <div className="flex justify-end grid-cols-12 px-6 my-6 gap-x-8">
              <button onClick={coreModalContext.openModal} className="text-white bg-primary">
                <p className="px-5 py-2 font-prompt">บันทึก</p>
              </button>
            </div>
            <CoreModal
              buttonSubmit="บันทึก"
              title="บันทึกข้อมูลบริษัท"
              content={
                <span className="mb-5 font-prompt text-subtitle-1">
                  คุณต้องการบันทึกข้อมูลบริษัทหรือไม่
                </span>
              }
              onSubmit={handleSubmit(context.createCompany)}
            />
          </>
        )}
      </Observer>
    </div>
  )
}

export default CompanyForm
