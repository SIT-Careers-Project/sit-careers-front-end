import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { FormHelperText } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import { AnnouncementFormSchema, AnnouncementFormAdminSchema } from '../services/validationSchema'
import { BannerImages } from '../../../core/components/BannerImage'
import { CoreModal } from '../../../core/components/Modal'
import { Observer } from 'mobx-react-lite'
import { modalContext } from '../../../core/contexts/modal_context'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/router'
import getConfig from 'next/config'
import { announcementUpdatePageContext } from '../context/announcement_update_page_context'
import PrimaryButton from '../../../core/components/Button/Primary'

import AnnouncementDateInfoForm from '../components/FormCreate/AnnouncementDateInfo'
import AnnouncementMainInfoForm from '../components/FormCreate/AnnouncementMainInfo'
import AnnouncementPropertyInfoForm from '../components/FormCreate/AnnouncementPropertyInfo'
import AnnouncementWalfareInfoForm from '../components/FormCreate/AnnouncementWelfareInfo'
import AnnouncementCompanyLocationInfo from '../components/FormCreate/AnnouncementCompanyLocationInfo'
import AnnouncementBusinessDateInfo from '../components/FormCreate/AnnouncementBusinessDateInfo'

const { publicRuntimeConfig } = getConfig()

const AnnouncementUpdateForm = ({ authContext }) => {
  const context = useContext(announcementUpdatePageContext)
  const coreModalContext = useContext(modalContext)

  const router = useRouter()
  const { announcement_id } = router.query
  const [file, setFile] = useState(null)

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(
      authContext === 'admin' ? AnnouncementFormAdminSchema : AnnouncementFormSchema
    ),
    defaultValues: { ...context.announcement }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.getAutoCompleteCompanies()
    context.getAutoCompleteJobPositions()
    context.getAnnouncement(announcement_id).then(() => {
      setTimeout(() => {
        reset({ ...context.announcement })
        const startDate = dayjs(context.announcement.start_date).format('YYYY-MM-DDThh:mm')
        const endDate = dayjs(context.announcement.end_date).format('YYYY-MM-DDThh:mm')
        context.keyChange('startDate', startDate)
        context.keyChange('endDate', endDate)
      }, 400)
      setTimeout(() => context.keyChange('renderDelay', false), 1000)
    })
  }, [announcement_id, context, coreModalContext, reset])

  return (
    <Observer>
      {() => (
        <>
          {!context.renderDelay && (
            <div className="w-full h-full max-w-screen-lg">
              <AnnouncementDateInfoForm
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
              />
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
                    <input name="picture" className="hidden" ref={register} />
                  </button>
                  <FormHelperText>
                    <span className="leading-8 text-red">{errors.file_picture?.message}</span>
                  </FormHelperText>
                  <AnnouncementMainInfoForm
                    register={register}
                    errors={errors}
                    control={control}
                    data={context}
                    authContext={authContext}
                    jobPosition={context?.announcement?.job_position_id}
                    companyName={context?.announcement?.company_id}
                  />
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
                    <AnnouncementPropertyInfoForm register={register} errors={errors} />
                    <AnnouncementWalfareInfoForm register={register} errors={errors} />
                  </div>
                  <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                    <AnnouncementCompanyLocationInfo register={register} errors={errors} />
                  </div>
                  <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                    <AnnouncementBusinessDateInfo
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  </div>
                </div>
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
                  title="บันทึกข้อมูลประกาศรับสมัคร"
                  content={
                    <span className="mb-5 font-prompt text-subtitle-1">
                      คุณต้องการบันทึกข้อมูลประกาศรับสมัครหรือไม่
                    </span>
                  }
                  onSubmit={handleSubmit(context.updateAnnouncement)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </Observer>
  )
}

export default AnnouncementUpdateForm
