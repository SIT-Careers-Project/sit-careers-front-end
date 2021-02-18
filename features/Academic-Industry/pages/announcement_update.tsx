import { Controller, useForm } from 'react-hook-form'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { days, jobType, salary } from '../services/constantVariable'

import { AnnouncementFormSchema } from '../services/validationSchema'
import { AutoComplete } from '../components/AutoComplete'
import { BannerImages } from '../../../core/components/BannerImage'
import { CoreModal } from '../../../core/components/Modal'
import { Observer } from 'mobx-react-lite'
import { modalContext } from '../../../core/contexts/modal_context'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRouter } from 'next/router'
import getConfig from 'next/config'
import { announcementUpdatePageContext } from '../context/announcement_update_page_context'

const { publicRuntimeConfig } = getConfig()

const AnnouncementUpdateForm = () => {
  const context = useContext(announcementUpdatePageContext)
  const coreModalContext = useContext(modalContext)

  const router = useRouter()
  const { announcement_id } = router.query
  const [file, setFile] = useState(null)
  const [renderDelay, setRenderDelay] = useState(true)

  const { handleSubmit, register, errors, control, reset } = useForm({
    resolver: yupResolver(AnnouncementFormSchema),
    defaultValues: { ...context.announcement }
  })

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.getAnnouncement(announcement_id)
    context.getAutoCompleteCompanies()
    context.getAutoCompleteJobPositions()
  }, [announcement_id, context, coreModalContext])

  useEffect(() => {
    setTimeout(() => reset({ ...context.announcement }), 400)
    setTimeout(() => setRenderDelay(false), 1500)
  }, [context.announcement, reset])

  return (
    <>
      {!renderDelay && (
        <Observer>
          {() => (
            <div className="w-full h-full max-w-screen-lg">
              <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
                <div className="px-6 pt-6">
                  <p className="font-semibold font-prompt text-heading-6">วันประกาศรับสมัคร</p>
                </div>
                <div className="flex flex-row px-6 py-6">
                  <div className="pr-6">
                    <TextField
                      id="datetime-local"
                      label="เปิดรับสมัคร *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true
                      }}
                      name="start_date"
                      inputRef={register}
                      error={!!errors.start_date}
                      helperText={errors.start_date?.message}
                    />
                  </div>
                  <div className="flex items-end justify-center pr-6">
                    <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
                  </div>
                  <div className="pr-6">
                    <TextField
                      id="datetime-local"
                      label="ปิดรับสมัคร *"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true
                      }}
                      name="end_date"
                      inputRef={register}
                      error={!!errors.end_date}
                      helperText={errors.end_date?.message}
                    />
                  </div>
                  <div className="flex justify-end w-2/4 grid-cols-12">
                    <button className="text-white bg-red">
                      <p className="px-5 py-3 text-white font-prompt text-subtitle-1">
                        ปิดรับสมัคร
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
                <div className="px-6 pt-6">
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
                </div>
                <div className="grid w-full grid-flow-row grid-cols-12 px-6 pt-6">
                  <div className="col-span-6 pr-3">
                    <input
                      className="hidden"
                      value={context?.announcement?.announcement_id}
                      name="announcement_id"
                      ref={register}
                    />
                    <TextField
                      label="หัวข้อ *"
                      className="w-full font-sarabun bg-grey-100"
                      defaultValue={context?.announcement?.announcement_title}
                      name="announcement_title"
                      inputRef={register}
                      error={!!errors.announcement_title}
                      helperText={errors.announcement_title?.message}
                    />
                  </div>
                  <div className="col-span-6 pl-3">
                    <AutoComplete
                      className="w-full"
                      label="บริษัท *"
                      inputRef={register}
                      keyName="company_id"
                      error={!!errors.company_id}
                      helperText={errors.company_id?.message}
                      options={context.autoCompleteCompany}
                      keySearch="company_name_th"
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between pt-6">
                  <div className="w-4/12 pl-6 pr-3">
                    <AutoComplete
                      className="w-full"
                      label="ประเภทของงาน *"
                      inputRef={register}
                      keyName="job_position_id"
                      keySearch="job_position"
                      error={!!errors.job_position_id}
                      helperText={errors.job_position_id?.message}
                      options={context.jobPositions}
                    />
                  </div>
                  <div className="w-4/12 pl-3 pr-6">
                    <FormControl
                      error={errors.job_type?.message}
                      className="w-full font-prompt bg-grey-100">
                      <InputLabel htmlFor="trinity-select">ประเภทของประกาศ *</InputLabel>
                      <Controller
                        control={control}
                        name="job_type"
                        as={
                          <Select id="trinity-select">
                            {jobType.map((job) => (
                              <MenuItem key={job.title} value={job.title}>
                                {job.title}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      />
                      <FormHelperText>{errors.job_type?.message}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="w-4/12 pr-6">
                    <FormControl
                      error={errors.salary?.message}
                      className="w-full font-prompt bg-grey-100">
                      <InputLabel htmlFor="salary-select">{'เงินเดือน (บาท) *'}</InputLabel>
                      <Controller
                        control={control}
                        id="salary-select"
                        name="salary"
                        as={
                          <Select id="trinity-select">
                            {salary.map((salary) => (
                              <MenuItem key={salary.title} value={salary.title}>
                                {salary.title}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      />
                      <FormHelperText>{errors.salary?.message}</FormHelperText>
                    </FormControl>
                  </div>
                </div>
                <div className="flex flex-col px-6 pt-6 pb-6">
                  <p className="mb-4 font-semibold font-prompt text-heading-6">รายละเอียดงาน</p>
                  <FormControl className="w-full font-prompt bg-grey-100">
                    <TextField
                      label="รายละเอียด *"
                      className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
                      variant="outlined"
                      defaultValue=""
                      rows={5}
                      multiline
                      fullWidth
                      name="job_description"
                      inputRef={register}
                      error={!!errors.job_description}
                      helperText={errors?.job_description?.message}
                    />
                  </FormControl>
                </div>
                <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
                <div className="flex flex-col px-6 pb-6">
                  <p className="mb-4 font-semibold font-prompt text-heading-6">คุณสมบัติ</p>
                  <FormControl className="w-full font-prompt bg-grey-100">
                    <TextField
                      label="คุณสมบัติ *"
                      className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
                      variant="outlined"
                      defaultValue=""
                      rows={5}
                      multiline
                      fullWidth
                      name="property"
                      inputRef={register}
                      error={!!errors.property}
                      helperText={errors.property?.message}
                    />
                  </FormControl>
                </div>
                <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
                <div className="flex flex-col px-6 pb-6">
                  <p className="mb-4 font-semibold font-prompt text-heading-6">สวัสดิการ</p>
                  <FormControl className="w-full font-prompt bg-grey-100">
                    <TextField
                      label="สวัสดิการ *"
                      className="border-opacity-50 place-content-start bg-grey-100 border-DEFAULT"
                      variant="outlined"
                      defaultValue=""
                      rows={5}
                      multiline
                      fullWidth
                      name="welfare"
                      inputRef={register}
                      error={!!errors.welfare}
                      helperText={errors.welfare?.message}
                    />
                  </FormControl>
                </div>
                <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
                <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">
                  สถานที่ปฏิบัติการ
                </p>
                <div className="w-full px-6">
                  <TextField
                    label="ที่อยู่ 1 *"
                    name="address_one"
                    className="font-sarabun bg-grey-100"
                    inputRef={register}
                    error={!!errors.address_one}
                    helperText={errors.address_one?.message}
                    fullWidth
                  />
                </div>
                <div className="w-full px-6 my-6">
                  <TextField
                    label="ที่อยู่ 2"
                    name="address_two"
                    className="font-sarabun bg-grey-100"
                    inputRef={register}
                    error={!!errors.address_two}
                    helperText={errors.address_two?.message}
                    fullWidth
                  />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="w-4/12 pl-6 pr-3">
                    <TextField
                      label="ซอย"
                      name="lane"
                      className="font-sarabun bg-grey-100"
                      inputRef={register}
                      error={!!errors.lane}
                      helperText={errors.lane?.message}
                      fullWidth
                    />
                  </div>
                  <div className="w-4/12 pl-3 pr-3">
                    <TextField
                      name="road"
                      label="ถนน"
                      className="font-sarabun bg-grey-100"
                      inputRef={register}
                      error={!!errors.road}
                      helperText={errors.road?.message}
                      fullWidth
                    />
                  </div>
                  <div className="w-4/12 pl-3 pr-6">
                    <TextField
                      name="sub_district"
                      label="ตำบล/เขต *"
                      className="font-sarabun bg-grey-100"
                      inputRef={register}
                      error={!!errors.sub_district}
                      helperText={errors.sub_district?.message}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="flex flex-row justify-between pb-6 mt-6">
                  <div className="w-4/12 pl-6 pr-3">
                    <TextField
                      name="district"
                      label="อำเภอ *"
                      className="font-sarabun bg-grey-100"
                      inputRef={register}
                      error={!!errors.district}
                      helperText={errors.district?.message}
                      fullWidth
                    />
                  </div>
                  <div className="w-4/12 px-3">
                    <TextField
                      name="province"
                      label="จังหวัด *"
                      className="font-sarabun bg-grey-100"
                      inputRef={register}
                      error={!!errors.province}
                      helperText={errors.province?.message}
                      fullWidth
                    />
                  </div>
                  <div className="w-4/12 pl-3 pr-6">
                    <TextField
                      name="postal_code"
                      label="รหัสไปรษณีย์ *"
                      className="font-sarabun bg-grey-100"
                      inputRef={register}
                      error={!!errors.postal_code}
                      helperText={errors.postal_code?.message}
                      fullWidth
                    />
                  </div>
                </div>
                <hr className="mt-3 mb-6 font-semibold opacity-25 text-secondary2" />
                <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">วันที่ทำการ</p>
                <div className="flex flex-row pb-6">
                  <div className="w-4/12 pl-6 pr-3">
                    <FormControl
                      error={!!errors?.start_business_day}
                      className="w-full font-prompt bg-grey-100">
                      <InputLabel htmlFor="start-business-day-select">วันเปิดทำการ *</InputLabel>
                      <Controller
                        control={control}
                        id="start-business-day-select"
                        name="start_business_day"
                        as={
                          <Select id="trinity-select">
                            {days.map((data) => (
                              <MenuItem key={data.day} value={data.day}>
                                {data.day}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      />
                      <FormHelperText>{errors.start_business_day?.message}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="w-4/12 pl-3 pr-3">
                    <TextField
                      name="start_business_time"
                      label="เวลาเปิดทำการ *"
                      className="font-sarabun bg-grey-100"
                      type="time"
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputRef={register}
                      error={!!errors.start_business_time}
                      helperText={errors.start_business_time?.message}
                      fullWidth
                    />
                  </div>
                  <div className="flex items-end justify-center col-span-1">
                    <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
                  </div>
                  <div className="w-4/12 pl-3 pr-3">
                    <FormControl
                      error={!!errors?.end_business_day}
                      className="w-full font-prompt bg-grey-100">
                      <InputLabel htmlFor="end-business-day-select">วันปิดทำการ *</InputLabel>
                      <Controller
                        control={control}
                        id="end-business-day-select"
                        name="end_business_day"
                        as={
                          <Select id="trinity-select">
                            {days.map((data) => (
                              <MenuItem key={data.day} value={data.day}>
                                {data.day}
                              </MenuItem>
                            ))}
                          </Select>
                        }
                      />
                      <FormHelperText>{errors.end_business_day?.message}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="w-4/12 pl-3 pr-6">
                    <TextField
                      name="end_business_time"
                      label="เวลาปิดทำการ *"
                      className="font-sarabun bg-grey-100"
                      type="time"
                      InputLabelProps={{
                        shrink: true
                      }}
                      inputRef={register}
                      error={!!errors.end_business_time}
                      helperText={errors.end_business_time?.message}
                      fullWidth
                    />
                  </div>
                </div>
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
                  onSubmit={handleSubmit(context.updateAnnouncement)}
                />
              </div>
            </div>
          )}
        </Observer>
      )}
    </>
  )
}

export default AnnouncementUpdateForm
