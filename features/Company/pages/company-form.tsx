import { useForm } from 'react-hook-form'
import React, { useContext, useEffect, useState } from 'react'
import { CompanyFormSchema, CompanyAdminSchema } from '../services/validationSchema'
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
import PrimaryButton from '../../../core/components/Button/Primary'
import { AlertContext } from 'core/contexts/alert_context'

const CompanyForm = ({ authContext }) => {
  const companySchema = authContext.roleUser === 'admin' ? CompanyAdminSchema : CompanyFormSchema
  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(companySchema)
  })
  const context = useContext(companyFormPageContext)
  const alertContext = useContext(AlertContext)
  const coreModalContext = useContext(modalContext)

  const [file, setFile] = useState(null)

  useEffect(() => {
    context.keyChange('alert', alertContext)
    context.keyChange('modal', coreModalContext)
    return () => {
      context.keyChange('modalDisable', false)
    }
  }, [alertContext, context, coreModalContext])

  return (
    <>
      {authContext.roleUser === 'admin' && (
        <div className="w-full max-w-screen-lg">
          <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
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
            <MainInfoForm register={register} errors={errors} control={control} />
            <DetailInfoForm errors={errors} control={control} />
          </div>
          <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
            <ContractInfoForm register={register} errors={errors} />
          </div>
          <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
            <LocationInfoForm register={register} errors={errors} />
          </div>
          <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
            <CompanyDateInfoForm register={register} errors={errors} control={control} />
          </div>
          <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
            {authContext.roleUser === 'admin' ? (
              <MouInfoForm disable={false} register={register} errors={errors} />
            ) : (
              <MouInfoForm disable={true} register={register} errors={errors} />
            )}
          </div>
          <Observer>
            {() => (
              <>
                <div className="flex justify-end grid-cols-12 my-6 gap-x-8">
                  <PrimaryButton
                    onClick={coreModalContext.openModal}
                    className="py-4 lg:w-1/4"
                    title="ค้นหา">
                    <p className="text-white font-prompt text-subtitle-1">บันทึก</p>
                  </PrimaryButton>
                </div>
                <CoreModal
                  buttonSubmit="บันทึก"
                  title="บันทึกข้อมูลบริษัท"
                  content={
                    <span className="mb-5 font-prompt text-subtitle-1">
                      คุณต้องการบันทึกข้อมูลบริษัทหรือไม่
                    </span>
                  }
                  isDisable={context.modalDisable}
                  onSubmit={handleSubmit(
                    authContext.roleUser === 'admin'
                      ? context.createCompanyByAdmin
                      : context.createCompany
                  )}
                />
              </>
            )}
          </Observer>
        </div>
      )}
    </>
  )
}

export default CompanyForm
