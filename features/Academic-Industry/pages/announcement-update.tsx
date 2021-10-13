import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CircularProgress, FormHelperText } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import getConfig from 'next/config'
import { Observer } from 'mobx-react-lite'
import dayjs from 'dayjs'

import { AnnouncementUpdateSchema, AnnouncementFormAdminSchema } from '../services/validationSchema'
import { BannerImages } from '../../../core/components/BannerImage'
import { CoreModal } from '../../../core/components/Modal'
import { modalContext } from '../../../core/contexts/modal_context'
import { announcementUpdatePageContext } from '../context/announcement_update_page_context'
import PrimaryButton from '../../../core/components/Button/Primary'
import AnnouncementDateInfoForm from '../components/FormCreate/AnnouncementDateInfo'
import AnnouncementMainInfoForm from '../components/FormCreate/AnnouncementMainInfo'
import AnnouncementPropertyInfoForm from '../components/FormCreate/AnnouncementPropertyInfo'
import AnnouncementWalfareInfoForm from '../components/FormCreate/AnnouncementWelfareInfo'
import AnnouncementCompanyLocationInfo from '../components/FormCreate/AnnouncementCompanyLocationInfo'
import AnnouncementBusinessDateInfo from '../components/FormCreate/AnnouncementBusinessDateInfo'
import { AlertContext } from 'core/contexts/alert_context'

const { publicRuntimeConfig } = getConfig()

const AnnouncementUpdateForm = ({ authContext, announcementId }) => {
  const context = useContext(announcementUpdatePageContext)
  const coreModalContext = useContext(modalContext)
  const alertContext = useContext(AlertContext)

  const [file, setFile] = useState(null)

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(
      authContext === 'admin' ? AnnouncementFormAdminSchema : AnnouncementUpdateSchema
    ),
    defaultValues: { ...context.announcement }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.keyChange('alert', alertContext)
    context.getAnnouncement(announcementId).then(() => {
      setTimeout(() => {
        reset({ ...context.announcement })
        const startDate = dayjs(context.announcement.start_date).format('YYYY-MM-DDThh:mm')
        const endDate = dayjs(context.announcement.end_date).format('YYYY-MM-DDThh:mm')
        const closeDate = dayjs().format('YYYY-MM-DDThh:mm')
        context.keyChange('startDate', startDate)
        context.keyChange('endDate', endDate)
        context.keyChange('closeDate', closeDate)
      }, 400)
      setTimeout(() => context.keyChange('renderDelay', false), 1000)
    })
    return () => {
      context.keyChange('announcement', [])
    }
  }, [announcementId, context, coreModalContext, reset])

  return (
    <Observer>
      {() => (
        <div className="w-full h-full max-w-screen-lg">
          {context.isLoading ? (
            <div className="flex justify-center pt-20">
              <CircularProgress />
            </div>
          ) : (
            <>
              {authContext.roleUser === 'viewer' ? (
                <AnnouncementDateInfoForm
                  openModal={() => context.handlerModal(true, coreModalContext.openModal)}
                  onSubmit={handleSubmit(context.updateAnnouncement)}
                  showCloseButton={context.showCloseButton}
                  register={register}
                  errors={errors}
                  startDate={context.startDate}
                  changeStartDate={(event) => {
                    context.keyChange('startDate', event.target.value)
                  }}
                  endDate={context.endDate}
                  changeEndDate={(event) => {
                    context.keyChange('endDate', event.target.value)
                  }}
                  data={context}
                  closeAnnouncement={() => context.keyChange('endDate', context.closeDate)}
                  disable={true}
                />
              ) : (
                <AnnouncementDateInfoForm
                  openModal={() => context.handlerModal(true, coreModalContext.openModal)}
                  onSubmit={handleSubmit(context.updateAnnouncement)}
                  showCloseButton={context.showCloseButton}
                  register={register}
                  errors={errors}
                  startDate={context.startDate}
                  changeStartDate={(event) => {
                    context.keyChange('startDate', event.target.value)
                  }}
                  authContext={authContext}
                  endDate={context.endDate}
                  changeEndDate={(event) => {
                    context.keyChange('endDate', event.target.value)
                  }}
                  data={context}
                  closeAnnouncement={() => context.keyChange('endDate', context.closeDate)}
                  disable={false}
                />
              )}
              <div>
                <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                  <p className="font-semibold font-prompt text-heading-6">ข้อมูลประกาศรับสมัคร</p>
                  <button className="w-1/2 pr-3 border-none focus:outline-none">
                    <label htmlFor="picture">
                      <BannerImages
                        imgSrc={
                          file === null || context?.announcement?.picture === undefined
                            ? `${publicRuntimeConfig.s3_url}/cover_announcement/${context?.announcement?.picture}`
                            : file
                        }
                        className="mt-5 cursor-pointer bg-grey-100"
                      />
                    </label>
                    {authContext.roleUser === 'viewer' ? (
                      <input
                        id="picture"
                        name="file_picture"
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
                        id="picture"
                        name="file_picture"
                        type="file"
                        className="hidden bg-grey-100"
                        ref={register}
                        onChange={(event) => {
                          setFile(URL.createObjectURL(event.target.files[0]))
                        }}
                      />
                    )}
                    <input name="picture" className="hidden" ref={register} />
                  </button>
                  <FormHelperText>
                    <span className="leading-8 text-red">{errors.file_picture?.message}</span>
                  </FormHelperText>
                  {authContext.roleUser === 'viewer' ? (
                    <AnnouncementMainInfoForm
                      register={register}
                      errors={errors}
                      control={control}
                      data={context}
                      authContext={authContext}
                      jobPosition={context?.announcement?.job_position_id}
                      companyName={context?.announcement?.company_id}
                      disable={true}
                    />
                  ) : (
                    <AnnouncementMainInfoForm
                      register={register}
                      errors={errors}
                      control={control}
                      data={context}
                      authContext={authContext}
                      jobPosition={context?.announcement?.job_position_id}
                      companyName={context?.announcement?.company_id}
                      disable={false}
                    />
                  )}
                </div>
                <div>
                  <input
                    className="hidden"
                    value={context?.announcement?.announcement_id}
                    name="announcement_id"
                    ref={register}
                  />
                  <input
                    className="hidden"
                    value={context?.announcement?.address_id}
                    name="address_id"
                    ref={register}
                  />
                  <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                    {authContext.roleUser === 'viewer' ? (
                      <>
                        <AnnouncementPropertyInfoForm
                          data={context}
                          register={register}
                          errors={errors}
                          disable={true}
                        />
                        <AnnouncementWalfareInfoForm
                          data={context}
                          register={register}
                          errors={errors}
                          disable={true}
                        />
                      </>
                    ) : (
                      <>
                        <AnnouncementPropertyInfoForm
                          data={context}
                          register={register}
                          errors={errors}
                          disable={false}
                        />
                        <AnnouncementWalfareInfoForm
                          data={context}
                          register={register}
                          errors={errors}
                          disable={false}
                        />
                      </>
                    )}
                  </div>
                  <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                    {authContext.roleUser === 'viewer' ? (
                      <AnnouncementCompanyLocationInfo
                        data={context}
                        register={register}
                        errors={errors}
                        disable={true}
                      />
                    ) : (
                      <AnnouncementCompanyLocationInfo
                        data={context}
                        register={register}
                        errors={errors}
                        disable={false}
                      />
                    )}
                  </div>
                  <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                    {authContext.roleUser === 'viewer' ? (
                      <AnnouncementBusinessDateInfo
                        register={register}
                        errors={errors}
                        control={control}
                        data={context}
                        disable={true}
                      />
                    ) : (
                      <AnnouncementBusinessDateInfo
                        register={register}
                        errors={errors}
                        control={control}
                        data={context}
                        disable={false}
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end grid-cols-12 my-6 gap-x-8">
                  {(authContext.roleUser === 'admin' ||
                    authContext.roleUser === 'manager' ||
                    authContext.roleUser === 'coordinator') && (
                    <PrimaryButton
                      onClick={() => context.handlerModal(false, coreModalContext.openModal)}
                      className="py-4 lg:w-1/4"
                      title="ค้นหา">
                      <p className="text-white font-prompt text-subtitle-1">บันทึก</p>
                    </PrimaryButton>
                  )}
                </div>
                {!context.modalCloseAnnouncement && coreModalContext.isOpen && (
                  <CoreModal
                    isDisable={context.disableButton}
                    buttonSubmit="บันทึก"
                    title="บันทึกข้อมูลประกาศรับสมัคร"
                    content={
                      <span className="mb-5 font-prompt text-subtitle-1">
                        คุณต้องการบันทึกข้อมูลประกาศรับสมัครหรือไม่
                      </span>
                    }
                    onSubmit={handleSubmit(context.updateAnnouncement)}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </Observer>
  )
}

export default AnnouncementUpdateForm
