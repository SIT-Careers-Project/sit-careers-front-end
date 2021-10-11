import { useForm } from 'react-hook-form'
import { FormHelperText, InputLabel } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import { AnnouncementFormAdminSchema, AnnouncementFormSchema } from '../services/validationSchema'
import { BannerImages } from '../../../core/components/BannerImage'
import { CoreModal } from '../../../core/components/Modal'
import { Observer } from 'mobx-react-lite'
import { announcementFormPageContext } from '../context/announcement_form_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { yupResolver } from '@hookform/resolvers/yup'
import AnnouncementDateInfoForm from '../components/FormCreate/AnnouncementDateInfo'
import AnnouncementMainInfoForm from '../components/FormCreate/AnnouncementMainInfo'
import AnnouncementPropertyInfoForm from '../components/FormCreate/AnnouncementPropertyInfo'
import AnnouncementWalfareInfoForm from '../components/FormCreate/AnnouncementWelfareInfo'
import AnnouncementCompanyLocationInfo from '../components/FormCreate/AnnouncementCompanyLocationInfo'
import AnnouncementBusinessDateInfo from '../components/FormCreate/AnnouncementBusinessDateInfo'
import PrimaryButton from '../../../core/components/Button/Primary'
import { AlertContext } from 'core/contexts/alert_context'

const AnnouncementForm = ({ authContext }) => {
  const context = useContext(announcementFormPageContext)
  const coreModalContext = useContext(modalContext)
  const alertContext = useContext(AlertContext)
  const [file, setFile] = useState(null)

  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(
      authContext === 'admin' ? AnnouncementFormAdminSchema : AnnouncementFormSchema
    )
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.keyChange('alert', alertContext)
    context.getAutoCompleteCompanies()
    context.getAutoCompleteJobPositions()
    return () => {
      return context.keyChange('modalDisable', false)
    }
  }, [context, coreModalContext])

  return (
    <div className="w-full h-full max-w-screen-lg">
      <AnnouncementDateInfoForm authContext={authContext} register={register} errors={errors} />
      <div>
        <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
          <p className="font-semibold font-prompt text-heading-6">ข้อมูลประกาศรับสมัคร</p>
          <button className="w-1/2 pr-3 border-none focus:outline-none">
            <InputLabel htmlFor="picture">
              <BannerImages imgSrc={file} className="mt-5 bg-cover cursor-pointer bg-grey-100" />
            </InputLabel>
            <input
              id="picture"
              type="file"
              name="file_picture"
              className="hidden"
              ref={register}
              onChange={(event) => setFile(URL.createObjectURL(event?.target?.files[0]))}
            />
          </button>
          <FormHelperText>
            <span className="leading-8 text-red">{errors.file_picture?.message}</span>
          </FormHelperText>
          <AnnouncementMainInfoForm
            register={register}
            errors={errors}
            authContext={authContext}
            control={control}
            data={context}
          />
        </div>
        <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
          <AnnouncementPropertyInfoForm register={register} errors={errors} />
          <AnnouncementWalfareInfoForm register={register} errors={errors} />
        </div>
        <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
          <AnnouncementCompanyLocationInfo register={register} errors={errors} />
        </div>
        <div className="w-full max-w-screen-lg p-10 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
          <AnnouncementBusinessDateInfo register={register} errors={errors} control={control} />
        </div>
        <Observer>
          {() => (
            <>
              <div className="flex justify-end grid-cols-12 my-6 gap-x-8">
                <PrimaryButton
                  onClick={coreModalContext.openModal}
                  className="py-4 lg:w-1/4"
                  title="ค้นหา">
                  <p className="text-white font-prompt text-subtitle-1">บันทึกและประกาศ</p>
                </PrimaryButton>
              </div>
              <CoreModal
                buttonSubmit="บันทึกและประกาศ"
                title="บันทึกและประกาศ"
                content={
                  <span className="mb-5 font-prompt text-subtitle-1">
                    คุณต้องการบันทึกและประกาศรับสมัครงานใช่หรือไม่
                  </span>
                }
                isDisable={context.modalDisable}
                onSubmit={handleSubmit(context.createAnnouncement)}
              />
            </>
          )}
        </Observer>
      </div>
    </div>
  )
}

export default AnnouncementForm
