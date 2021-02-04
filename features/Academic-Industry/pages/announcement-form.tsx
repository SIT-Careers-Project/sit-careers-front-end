import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Observer } from 'mobx-react-lite'
import {
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormHelperText
} from '@material-ui/core'
import { BannerImages } from '../../../core/components/BannerImage'
import { announcementFormPageContext } from '../context/announcement_form_page_context'
import { jobType, jobPosition, days, salary } from '../services/constantVariable'
import { modalContext } from '../../../core/contexts/modal_context'
import { CoreModal } from '../../../core/components/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnnouncementFormSchema } from '../services/validationSchema'

const AnnouncementForm = () => {
  const context = useContext(announcementFormPageContext)
  const coreModalContext = useContext(modalContext)
  const { handleSubmit, register, errors, control } = useForm({
    resolver: yupResolver(AnnouncementFormSchema)
  })

  const [file, setFile] = useState(null)

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
  }, [context, coreModalContext])
  return (
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
              <p className="px-5 py-3 text-white font-prompt text-subtitle-1">ปิดรับสมัคร</p>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
        <div className="px-6 pt-6">
          <p className="font-semibold font-prompt text-heading-6">ข้อมูลประกาศรับสมัคร</p>
          <button className="w-full h-40 border-none focus:outline-none">
            <InputLabel htmlFor="picture">
              <BannerImages imgSrc={file} className="mt-5 cursor-pointer bg-grey-100" />
            </InputLabel>
            <input
              id="picture"
              type="file"
              name="picture"
              className="hidden"
              ref={register}
              onChange={(event) => setFile(URL.createObjectURL(event?.target?.files[0]))}
            />
          </button>
        </div>
        <div className="w-full px-6 pt-6">
          <TextField
            label="หัวข้อ *"
            className="font-sarabun bg-grey-100"
            name="announcement_title"
            inputRef={register}
            error={!!errors.announcement_title}
            helperText={errors.announcement_title?.message}
            fullWidth
          />
        </div>
        <div className="flex flex-row justify-between pt-6">
          <div className="w-4/12 pl-6 pr-3">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="trinity-select">ประเภทของงาน *</InputLabel>
              <Controller
                control={control}
                name="job_position"
                as={
                  <Select id="trinity-select">
                    {jobPosition.map((job) => (
                      <MenuItem key={job.title} value={job.title}>
                        {job.title}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
              <FormHelperText>{errors.job_position?.message}</FormHelperText>
            </FormControl>
          </div>
          <div className="w-4/12 pl-3 pr-6">
            <FormControl className="w-full font-prompt bg-grey-100">
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
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="trinity-select">{'เงินเดือน (บาท) *'}</InputLabel>
              <Controller
                control={control}
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
              helperText={errors.job_description?.message}
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
        <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">สถานที่ปฏิบัติการ</p>
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
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="start-business-day-select">วันเปิดทำการ *</InputLabel>
              <Controller
                control={control}
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
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="end-business-day-select">วันปิดทำการ *</InputLabel>
              <Controller
                control={control}
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
