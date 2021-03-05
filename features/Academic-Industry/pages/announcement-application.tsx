import React, { useContext, useEffect } from 'react'
import {
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText
} from '@material-ui/core'
import { Observer } from 'mobx-react-lite'
import { announcementApplicationFormContext } from '../context/announcement_application_page_context'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'
import PrimaryButton from '../../../core/components/Button/Primary'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ApplicationFormSchema } from '../services/validationSchema'

const ApplicationForm = () => {
  const context = useContext(announcementApplicationFormContext)
  const coreModalContext = useContext(modalContext)
  const router = useRouter()

  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(ApplicationFormSchema)
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.getAnnouncementById(router.query.announcement_id)
  }, [context, coreModalContext, router])

  const Prefix = [{ title: 'นาย' }, { title: 'นางสาว' }, { title: 'นาง' }]
  const curriculum = [
    { title: 'สาขาวิชาเทคโนโลยีสารสนเทศ (IT)', value: 'IT' },
    { title: 'สาขาวิชาวิทยาการคอมพิวเตอร์ (CS)', value: 'CS' },
    { title: 'สาขาวิชานวัตกรรมบริหารดิจิทัล (DSI)', value: 'DSI' }
  ]
  const years = [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }]

  return (
    <div className="w-full h-full max-w-screen-lg pb-3">
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="grid w-full grid-cols-12 px-6 py-6">
          <div className="col-span-5">
            <div className="w-full px-4 py-6 ml-auto mr-auto md:w-10/12">
              <img alt="..." src="/image/application.png" />
            </div>
          </div>
          <div className="col-span-7 px-4">
            <div className="px-6 py-6">
              <span className="font-semibold font-prompt text-heading-6">สมัครงาน: </span>
              <span className="font-semibold font-prompt text-heading-6 text-primary">
                <Observer>
                  {() => (
                    <>
                      <input
                        name="announcement_id"
                        ref={register}
                        value={context?.announcement?.announcement_id}
                        className="hidden"
                      />
                      {context.announcement?.announcement_title}
                    </>
                  )}
                </Observer>
              </span>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-3/12">
                <FormControl error={!!errors?.prefix} className="w-full font-prompt bg-grey-100">
                  <InputLabel htmlFor="prefix-select">คำนำหน้า *</InputLabel>
                  <Controller
                    control={control}
                    id="prefix-select"
                    name="prefix"
                    as={
                      <Select>
                        {Prefix.map((prefix) => (
                          <MenuItem key={prefix.title} value={prefix.title}>
                            {prefix.title}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                  />
                  <FormHelperText>{errors.prefix?.message}</FormHelperText>
                </FormControl>
              </div>
              <div className="w-4/12">
                <TextField
                  name="first_name"
                  label="ชื่อ *"
                  className="font-sarabun bg-grey-100"
                  inputRef={register}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  fullWidth
                />
              </div>
              <div className="w-4/12">
                <TextField
                  label="นามสกุล *"
                  name="last_name"
                  className="font-sarabun bg-grey-100"
                  inputRef={register}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row justify-between gap-5 px-6 py-3">
              <div className="w-1/2">
                <FormControl
                  error={!!errors?.curriculum}
                  className="w-full font-prompt bg-grey-100">
                  <InputLabel htmlFor="curriculum-select">สาขา *</InputLabel>
                  <Controller
                    control={control}
                    id="curriculum-select"
                    name="curriculum"
                    as={
                      <Select id="trinity-select" name="curriculum">
                        {curriculum.map((data) => (
                          <MenuItem key={data.value} value={data.value}>
                            {data.title}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                  />
                  <FormHelperText>{errors.curriculum?.message}</FormHelperText>
                </FormControl>
              </div>
              <div className="w-1/2">
                <FormControl error={!!errors?.year} className="w-full font-prompt bg-grey-100">
                  <InputLabel htmlFor="year-select">ชั้นปี *</InputLabel>
                  <Controller
                    control={control}
                    id="year-select"
                    name="year"
                    as={
                      <Select id="trinity-select" name="year">
                        {years.map((data) => (
                          <MenuItem key={data.title} value={data.title}>
                            {data.title}
                          </MenuItem>
                        ))}
                      </Select>
                    }
                  />
                  <FormHelperText>{errors.year?.message}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-full">
                <TextField
                  label="เบอร์โทรศัพท์ *"
                  name="tel_no"
                  className="font-sarabun bg-grey-100"
                  inputRef={register}
                  error={!!errors.tel_no}
                  helperText={errors.tel_no?.message}
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-full">
                <TextField
                  label="อีเมล *"
                  name="email"
                  className="font-sarabun bg-grey-100"
                  inputRef={register}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row justify-between px-6 py-3">
              <div className="w-full">
                <TextField
                  label="Link ผลงาน *"
                  name="resume_link"
                  className="font-sarabun bg-grey-100"
                  inputRef={register}
                  error={!!errors.resume_link}
                  helperText={errors.resume_link?.message}
                  fullWidth
                />
              </div>
            </div>
            <div className="w-full col-span-7 px-6 py-3">
              <label htmlFor="upload-photo">
                <p className="mb-3 mr-40 font-prompt-medium text-body-1">อัพโหลดผลงาน</p>
                <input name="file_resume" type="file" ref={register} />
                <input name="path_file" className="hidden" ref={register} />
              </label>
            </div>
            <input name="status" defaultValue="-" ref={register} className="hidden" />
            <Observer>
              {() => (
                <>
                  <div
                    className="flex justify-end grid-cols-12 px-6 my-6 gap-x-8"
                    id="button-application">
                    <PrimaryButton
                      onClick={coreModalContext.openModal}
                      className="ml-10 shadow-md lg:w-2/6 btn-grad">
                      <p className="px-4 py-3 text-white font-prompt text-subtitle-1">
                        ยืนยันการสมัคร
                      </p>
                    </PrimaryButton>
                  </div>
                  <CoreModal
                    buttonSubmit="สมัคร"
                    title="ยืนยันการสมัคร"
                    content={
                      <span className="mb-5 font-prompt text-subtitle-1">
                        คุณต้องการยืนยันการสมัครใช่หรือไม่
                      </span>
                    }
                    onSubmit={handleSubmit(context.createApplication)}
                  />
                </>
              )}
            </Observer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm
