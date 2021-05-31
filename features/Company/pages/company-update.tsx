import { useForm } from 'react-hook-form'
import React, { useContext, useEffect, useState } from 'react'

import { Avatar } from '../../../core/components/Avatar'
import { CoreModal } from '../../../core/components/Modal'
import { modalContext } from '../../../core/contexts/modal_context'
import { CompanyFormSchema } from '../services/validationSchema'
import { Observer } from 'mobx-react-lite'
import { companyUpdatePageContext } from '../contexts/company_update_page_context'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import PrimaryButton from '../../../core/components/Button/Primary'
import MainInfoForm from '../components/FormCreate/main-info'
import DetailInfoForm from '../components/FormCreate/detail-info'
import ContractInfoForm from '../components/FormCreate/contract-info'
import LocationInfoForm from '../components/FormCreate/location-info'
import CompanyDateInfoForm from '../components/FormCreate/company-date-info'
import MouInfoForm from '../components/FormCreate/mou-info'
import { AlertContext } from 'core/contexts/alert_context'

const { publicRuntimeConfig } = getConfig()

const CompanyForm = ({ authContext }) => {
  const context = useContext(companyUpdatePageContext)
  const coreModalContext = useContext(modalContext)
  const alertContext = useContext(AlertContext)

  const router = useRouter()
  const { company_id } = router.query
  const [file, setFile] = useState(null)
  const [renderDelay, setRenderDelay] = useState(true)

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(CompanyFormSchema),
    defaultValues: { ...context.company }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.keyChange('alert', alertContext)
    context.getCompany(company_id).then(() => {
      setTimeout(() => reset({ ...context.company }), 400)
      setTimeout(() => setRenderDelay(false), 1000)
    })
  }, [alertContext, company_id, context, coreModalContext, reset])

  return (
    <>
      {!renderDelay && (
        <Observer>
          {() => (
            <div className="w-full max-w-screen-lg">
              <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                <p className="font-semibold font-prompt text-heading-6">ข้อมูลบริษัท</p>
                <button className="border-none focus:outline-none">
                  <label htmlFor="company_logo_image">
                    <Avatar
                      imgSrc={
                        file === null || context?.company?.logo === undefined
                          ? `${publicRuntimeConfig.s3_url}/logo/${context?.company?.logo}`
                          : file
                      }
                      className="mt-5 cursor-pointer bg-grey-100"
                    />
                  </label>
                  <input
                    id="company_logo_image"
                    name="company_logo_image"
                    type="file"
                    className="hidden bg-grey-100"
                    ref={register}
                    onChange={(event) => {
                      setFile(URL.createObjectURL(event.target.files[0]))
                    }}
                  />
                  <input name="logo" className="hidden" ref={register} />
                  <input name="company_id" className="hidden" ref={register} />
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
              <div className="flex justify-end grid-cols-12 my-6 gap-x-8 focus:outline-none">
                {authContext.roleUser === 'admin' && (
                  <button
                    onClick={() => context.handlerModal(true, coreModalContext.openModal)}
                    className="py-4 lg:w-1/4 bg-red focus:outline-none">
                    <p className="text-white font-prompt text-subtitle-1">ลบบริษัท</p>
                  </button>
                )}
                {authContext.roleUser === 'manager' && (
                  <button
                    onClick={() => context.handlerModal(true, coreModalContext.openModal)}
                    className="py-4 lg:w-1/4 bg-red focus:outline-none">
                    <p className="text-white font-prompt text-subtitle-1">ลบบริษัท</p>
                  </button>
                )}
                <PrimaryButton
                  onClick={() => context.handlerModal(false, coreModalContext.openModal)}
                  className="py-4 lg:w-1/4">
                  <p className="text-white font-prompt text-subtitle-1">บันทึก</p>
                </PrimaryButton>
              </div>
              {context.modalDelete &&
                coreModalContext.isOpen &&
                authContext.roleUser === 'admin' && (
                  <CoreModal
                    isDisable={context.disableButton}
                    buttonSubmit="ลบข้อมูลบริษัท"
                    title="คุณต้องการลบข้อมูลบริษัทใช่หรือไม่"
                    color="bg-red"
                    content={
                      <span className="mb-5 font-prompt text-subtitle-1">ลบข้อมูลบริษัท</span>
                    }
                    onSubmit={() => context.deleteCompany(company_id)}
                  />
                )}
              {context.modalDelete &&
                coreModalContext.isOpen &&
                authContext.roleUser !== 'admin' && (
                  <CoreModal
                    isDisable={context.disableButton}
                    buttonSubmit="ส่งคำขอ"
                    title="คุณต้องการส่งคำขอลบข้อมูลบริษัทใช่หรือไม่"
                    color="bg-red"
                    content={
                      <span className="mb-5 font-prompt text-subtitle-1">
                        ส่งคำขอลบข้อมูลบริษัท
                      </span>
                    }
                    onSubmit={context.requestDeleteCompany}
                  />
                )}
              {!context.modalDelete && coreModalContext.isOpen && (
                <CoreModal
                  isDisable={context.disableButton}
                  buttonSubmit="บันทึก"
                  title="บันทึกข้อมูลบริษัท"
                  content={
                    <span className="mb-5 font-prompt text-subtitle-1">
                      คุณต้องการบันทึกข้อมูลบริษัทหรือไม่
                    </span>
                  }
                  onSubmit={handleSubmit(context.updateCompany)}
                />
              )}
            </div>
          )}
        </Observer>
      )}
    </>
  )
}

export default CompanyForm
