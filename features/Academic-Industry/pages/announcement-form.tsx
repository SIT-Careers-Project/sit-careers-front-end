import { useForm } from 'react-hook-form'
import { FormHelperText, InputLabel } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'

import { AnnouncementFormSchema } from '../services/validationSchema'
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

const AnnouncementForm = () => {
  const context = useContext(announcementFormPageContext)
  const coreModalContext = useContext(modalContext)
  const [file, setFile] = useState(null)

  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(AnnouncementFormSchema)
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.getAutoCompleteCompanies()
    context.getAutoCompleteJobPositions()
  }, [context, coreModalContext])

  return (
    <div className="w-full h-full max-w-screen-lg">
      <AnnouncementDateInfoForm register={register} errors={errors} />
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="px-6 pt-6">
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
        </div>
        <AnnouncementMainInfoForm
          register={register}
          errors={errors}
          control={control}
          data={context}
        />
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <AnnouncementPropertyInfoForm register={register} errors={errors} />
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <AnnouncementWalfareInfoForm register={register} errors={errors} />
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <AnnouncementCompanyLocationInfo register={register} errors={errors} />
        <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
        <AnnouncementBusinessDateInfo register={register} errors={errors} control={control} />
        <Observer>
          {() => (
            <>
              <div className="flex justify-end grid-cols-12 px-6 my-6">
                <button onClick={coreModalContext.openModal} className="text-white bg-primary">
                  <p className="px-5 py-3 text-white font-prompt text-subtitle-1">
                    บันทึกและประกาศ
                  </p>
                </button>
              </div>
              <CoreModal
                buttonSubmit="บันทึกและประกาศ"
                title="บันทึกและประกาศ"
                content={
                  <span className="mb-5 font-prompt text-subtitle-1">
                    คุณต้องการบันทึกและประกาศรับสมัครงานใช่หรือไม่
                  </span>
                }
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
