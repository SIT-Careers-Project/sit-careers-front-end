/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import React, { useContext, useEffect, useState } from 'react'
import getConfig from 'next/config'
import { yupResolver } from '@hookform/resolvers/yup'
import { Observer } from 'mobx-react-lite'
import { CircularProgress } from '@material-ui/core'

import { Avatar } from '../../../core/components/Avatar'
import { CoreModal } from '../../../core/components/Modal'
import { modalContext } from '../../../core/contexts/modal_context'
import { CompanyFormSchema, CompanyAdminSchema } from '../services/validationSchema'
import { companyUpdatePageContext } from '../contexts/company_update_page_context'
import PrimaryButton from '../../../core/components/Button/Primary'
import MainInfoForm from '../components/FormCreate/main-info'
import DetailInfoForm from '../components/FormCreate/detail-info'
import ContractInfoForm from '../components/FormCreate/contract-info'
import LocationInfoForm from '../components/FormCreate/location-info'
import CompanyDateInfoForm from '../components/FormCreate/company-date-info'
import MouInfoForm from '../components/FormCreate/mou-info'
import { AlertContext } from 'core/contexts/alert_context'

const { publicRuntimeConfig } = getConfig()

const CompanyForm = ({ authContext, companyId }) => {
  const companySchema = authContext.roleUser === 'admin' ? CompanyAdminSchema : CompanyFormSchema
  const context = useContext(companyUpdatePageContext)
  const coreModalContext = useContext(modalContext)
  const alertContext = useContext(AlertContext)

  const [file, setFile] = useState(null)
  const [renderDelay, setRenderDelay] = useState(true)

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(companySchema),
    defaultValues: { ...context.company }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.keyChange('alert', alertContext)
    if (authContext.roleUser === 'coordinator' || authContext.roleUser === 'manager') {
      context.keyChange('require', true)
    }
    context.getCompany(companyId).then(() => {
      setTimeout(() => reset({ ...context.company }), 400)
      setTimeout(() => {
        context.keyChange('isLoading', false)
      }, 1000)
    })
    return () => {
      context.keyChange('isDisable', false)
      context.keyChange('require', false)
    }
  }, [alertContext, companyId, context, coreModalContext, reset])

  return (
    <Observer>
      {() => (
        <>
          {context.isLoading ? (
            <div className="flex justify-center mt-20">
              <CircularProgress />
            </div>
          ) : (
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
                  {authContext.roleUser === 'viewer' ? (
                    <input
                      id="company_logo_image"
                      name="company_logo_image"
                      type="file"
                      className="hidden bg-grey-100"
                      ref={register}
                      disabled={true}
                      onChange={(event) => {
                        setFile(URL.createObjectURL(event.target.files[0]))
                      }}
                    />
                  ) : (
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
                  )}
                  <input name="logo" className="hidden" ref={register} />
                  <input name="company_id" className="hidden" ref={register} />
                </button>
                {authContext.roleUser === 'admin' && (
                  <MainInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    disable={false}
                    viewer={false}
                    require={context.require}
                  />
                )}
                {authContext.roleUser === 'viewer' && (
                  <MainInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    disable={true}
                    viewer={true}
                    require={context.require}
                  />
                )}
                {(authContext.roleUser === 'manager' || authContext.roleUser === 'coordinator') && (
                  <MainInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    disable={true}
                    viewer={false}
                    require={context.require}
                  />
                )}
                {authContext.roleUser === 'viewer' ? (
                  <DetailInfoForm errors={errors} control={control} disable={true} />
                ) : (
                  <DetailInfoForm
                    errors={errors}
                    control={control}
                    disable={false}
                    require={context.require}
                  />
                )}
              </div>
              <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                {authContext.roleUser === 'viewer' && (
                  <ContractInfoForm
                    register={register}
                    errors={errors}
                    disable={true}
                    contract={false}
                    require={context.require}
                  />
                )}
                {authContext.roleUser === 'coordinator' && (
                  <ContractInfoForm
                    register={register}
                    errors={errors}
                    disable={false}
                    contract={true}
                    require={context.require}
                  />
                )}
                {(authContext.roleUser === 'manager' || authContext.roleUser === 'admin') && (
                  <ContractInfoForm
                    register={register}
                    errors={errors}
                    disable={false}
                    contract={false}
                    require={context.require}
                  />
                )}
              </div>
              <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                {authContext.roleUser === 'viewer' ? (
                  <LocationInfoForm register={register} errors={errors} disable={true} />
                ) : (
                  <LocationInfoForm
                    register={register}
                    errors={errors}
                    disable={false}
                    require={context.require}
                  />
                )}
              </div>
              <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                {authContext.roleUser === 'viewer' ? (
                  <CompanyDateInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    disable={true}
                    require={context.require}
                  />
                ) : (
                  <CompanyDateInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    disable={false}
                    require={context.require}
                  />
                )}
              </div>
              <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                {authContext.roleUser === 'admin' ? (
                  <MouInfoForm
                    disable={false}
                    register={register}
                    require={context.require}
                    errors={errors}
                  />
                ) : (
                  <MouInfoForm
                    disable={true}
                    register={register}
                    errors={errors}
                    require={context.require}
                  />
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
                {(authContext.roleUser === 'admin' ||
                  authContext.roleUser === 'manager' ||
                  authContext.roleUser === 'coordinator') && (
                  <PrimaryButton
                    onClick={() => context.handlerModal(false, coreModalContext.openModal)}
                    className="py-4 lg:w-1/4">
                    <p className="text-white font-prompt text-subtitle-1">บันทึก</p>
                  </PrimaryButton>
                )}
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
                    onSubmit={() => context.deleteCompany(companyId)}
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
        </>
      )}
    </Observer>
  )
}

export default CompanyForm
