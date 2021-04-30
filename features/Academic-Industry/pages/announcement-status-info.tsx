/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect } from 'react'
import { Observer } from 'mobx-react-lite'
import { announcementStatusInfoContext } from '../context/announcement_status_Info_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import AnnouncementResumeInfo from '../components/AnnouncementResume'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { InfoOutlined } from '@material-ui/icons'
import { Controller } from 'react-hook-form'
import { applicationStatus } from '../services/constantVariable'
import PrimaryButton from '../../../core/components/Button/Primary'
import { CoreModal } from '../../../core/components/Modal'
import { StatusFormSchema } from '../services/validationSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthContext } from 'core/contexts/auth_context'

const ApplicationInfo = ({ authContext }) => {
  const context = useContext(announcementStatusInfoContext)
  const coreModalContext = useContext(modalContext)
  const coreAuthContext = useContext(AuthContext)
  const router = useRouter()
  const { announcement_resume_id } = router.query

  const { handleSubmit, register, reset, control, errors } = useForm({
    resolver: yupResolver(StatusFormSchema),
    defaultValues: { ...context.application }
  })

  useEffect(() => {
    coreAuthContext.fetchMe().then(() => {
      context.keyChange('modal', coreModalContext)
      const applicationDate = dayjs(context?.application?.created_at).format('DD MMMM YYYY')
      context.keyChange('applicationDate', applicationDate)
      if (coreAuthContext.roleUser === 'admin') {
        context.getAnnouncementResumeByIdForAdmin(announcement_resume_id).then(() => {
          context.setCheckStatus(context?.application?.status)
        })
      } else if (
        coreAuthContext.roleUser === 'manager' ||
        coreAuthContext.roleUser === 'coordinator'
      ) {
        context.getAnnouncementResumeByIdForCompanyId(announcement_resume_id).then(() => {
          context.setCheckStatus(context?.application?.status)
        })
      } else if (coreAuthContext.roleUser === 'student') {
        context.getAnnouncementResumeByIdForUserId(announcement_resume_id).then(() => {
          setTimeout(() => reset({ ...context.application }), 400)
        })
      }
    })
  }, [coreAuthContext, announcement_resume_id, context, coreModalContext, reset])

  return (
    <Observer>
      {() => (
        <>
          <div className="w-full h-full max-w-screen-lg pb-8">
            <AnnouncementResumeInfo
              data={context.application}
              register={register}
              applicationDate={context.applicationDate}
            />
            {(authContext.roleUser === 'admin' ||
              authContext.roleUser === 'manager' ||
              authContext.roleUser === 'coordinator') && (
              <div className="w-full max-w-screen-lg px-10 py-5 mx-auto mt-5 bg-white rounded-lg shadow-lg font-prompt">
                <span className="font-semibold font-prompt text-heading-6">สถานะของผู้สมัคร</span>
                <div className="pt-3 font-prompt-light text-body-2 text-secondary2">
                  <InfoOutlined className="mb-2 mr-2" fontSize="small" />
                  หมายเหตุ: หากเลือก "ปฏิเสธการรับสมัคร" กรุณาระบุรายละเอียด
                  (ผู้สมัครจะไม่เห็นรายละเอียดดังกล่าว)
                </div>
                <div className="w-full py-6">
                  <input
                    className="hidden"
                    value={context?.application?.announcement_resume_id}
                    name="announcement_id"
                    ref={register}
                  />
                  <FormControl
                    error={!!errors?.status}
                    className="w-full font-prompt"
                    variant="outlined">
                    <InputLabel htmlFor="status-select" id="select-outlined-label">
                      สถานะ *
                    </InputLabel>
                    <Controller
                      control={control}
                      id="status-select"
                      name="status"
                      render={({ onChange, value }) => (
                        <Select
                          id="select-outlined-label"
                          name="status"
                          value={value ? value : ''}
                          onChange={(event) => {
                            if (typeof event.target.value === 'string') {
                              context.setCheckStatus(event.target.value)
                            }
                            onChange(event)
                          }}>
                          {applicationStatus.map((status) => (
                            <MenuItem key={status.title} value={status.title}>
                              {status.title}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors.status?.message}</FormHelperText>
                  </FormControl>
                </div>
                <div className="flex flex-col">
                  <FormControl className="w-full font-prompt">
                    <TextField
                      label="รายละเอียด"
                      disabled={context.isDisable}
                      className="border-opacity-50 place-content-start border-DEFAULT"
                      variant="outlined"
                      defaultValue=""
                      rows={5}
                      multiline
                      fullWidth
                      name="note"
                      inputRef={register}
                      error={!!errors.note}
                      helperText={errors.note?.message}
                    />
                  </FormControl>
                </div>
                <div>
                  <div className="flex justify-end grid-cols-12 my-6">
                    <PrimaryButton
                      onClick={coreModalContext.openModal}
                      className="py-4 lg:w-1/4"
                      title="บันทึก">
                      <p className="text-white font-prompt text-subtitle-1">บันทึก</p>
                    </PrimaryButton>
                  </div>
                  <CoreModal
                    buttonSubmit="บันทึก"
                    title="บันทึกสถานะของผู้สมัคร"
                    content={
                      <span className="mb-5 font-prompt text-subtitle-1">
                        คุณต้องการบันทึกสถานะของผู้สมัครหรือไม่
                      </span>
                    }
                    onSubmit={handleSubmit(context.updateAnnouncementResume)}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Observer>
  )
}
export default ApplicationInfo
