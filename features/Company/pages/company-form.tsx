import { Controller, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import React, { useContext, useEffect } from 'react'

import { Avatar } from '../../../core/components/Avatar'
import { companyFormPageContext } from '../contexts/company_form_page_context'
import { useObserver } from 'mobx-react-lite'
import { useRouter } from 'next/router'

const CompanyForm = () => {
  const { control, handleSubmit, register } = useForm()
  const context = useContext(companyFormPageContext)
  const router = useRouter()

  useEffect(() => {
    if (context.router) {
      router.push('/company/info-management')
    }
  }, [context.router, router])

  const companyType = [
    { title: 'Software House' },
    { title: 'Technology Consultant' },
    { title: 'Big data' },
    { title: 'DevOps' },
    { title: 'Cloud' }
  ]

  const days = [
    { day: 'จันทร์' },
    { day: 'อังคาร' },
    { day: 'พุธ' },
    { day: 'พฤหัสบดี' },
    { day: 'ศุกร์' },
    { day: 'เสาร์' },
    { day: 'อาทิตย์' }
  ]

  return useObserver(() => (
    <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
      <div className="px-6 pt-6">
        <p className="font-semibold font-prompt text-heading-6">ข้อมูลบริษัท</p>
        <Avatar className="mt-5 bg-grey-100" />
        <div className="hidden">
          <Controller
            as={<TextField defaultValue="path/to/logo" />}
            label="logo"
            name="logo"
            defaultValue="path/to/logo"
            control={control}
            className="hidden w-full font-prompt bg-grey-100"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 p-6 gap-x-8">
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            label="ชื่อภาษาไทย *"
            name="company_name_th"
            control={control}
            className="w-full font-sarabun bg-grey-100"
          />
          <div className="mt-5">
            <FormControl className="w-full font-prompt bg-grey-100">
              <InputLabel htmlFor="company-type-select">ประเภทธุรกิจ *</InputLabel>
              <Controller
                control={control}
                name="company_type"
                as={
                  <Select id="company-type-select">
                    {companyType.map((company) => (
                      <MenuItem key={company.title} value={company.title}>
                        {company.title}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            label="ชื่อภาษาอังกฤษ *"
            name="company_name_en"
            control={control}
            className="w-full bg-grey-100"
          />
          <div className="mt-5">
            <Controller
              as={TextField}
              label="เว็บไซต์"
              id="website"
              name="website"
              control={control}
              className="w-full bg-grey-100"
            />
          </div>
        </div>
        <div className="col-span-12 mt-5">
          <Controller
            as={<textarea placeholder="แนะนำบริษัท" />}
            control={control}
            className="w-full h-40 border-opacity-50 placeholder-secondary2 border-secondary2 place-content-start bg-grey-100 border-DEFAULT"
            name="about_us"
            ref={register({ required: true })}
          />
        </div>
        <div className="col-span-12 mt-5">
          <Controller
            as={<textarea placeholder="Bio" value="path/to/logo" />}
            control={control}
            className="hidden w-full h-40 border-opacity-50 placeholder-secondary2 border-secondary2 place-content-start bg-grey-100 border-DEFAULT"
            name="logo"
            ref={register({ required: true })}
          />
        </div>
      </div>
      <hr className="font-semibold opacity-25 text-secondary2" />
      <div className="grid grid-cols-12 px-6 my-6 gap-x-8">
        <div className="col-span-12">
          <p className="font-semibold font-prompt text-heading-6">รายละเอียดบริษัท</p>
        </div>
        <div className="col-span-12 mt-5">
          <Controller
            as={<textarea placeholder="รายละเอียด" />}
            control={control}
            name="description"
            ref={register({ required: true })}
            className="w-full h-40 border-opacity-50 placeholder-secondary2 border-secondary2 place-content-start bg-grey-100 border-DEFAULT"
          />
        </div>
      </div>
      <hr className="font-semibold opacity-25 text-secondary2" />
      <div className="grid grid-cols-12 px-6 my-6 gap-x-8">
        <div className="col-span-12">
          <p className="font-semibold font-prompt text-heading-6">ข้อมูลติดต่อ</p>
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="อีเมล์ผู้จัดการ *"
            name="e_mail_manager"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="อีเมล์ผู้ประสานงาน *"
            name="e_mail_coordinator"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-12 mt-6">
          <p className="font-semibold font-prompt text-heading-6">เบอร์ติดต่อ</p>
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="เบอร์สำนักงาน"
            name="tel_no"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="เบอร์โทรศัพท์"
            name="phone_no"
            className="w-full bg-grey-100"
          />
        </div>
      </div>
      <hr className="font-semibold opacity-25 text-secondary2" />
      <div className="grid grid-cols-12 px-6 my-6 gap-x-8">
        <div className="col-span-12">
          <p className="font-semibold font-prompt text-heading-6">สถานที่ทำการ</p>
        </div>
        <div className="col-span-12 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="ที่อยู่ 1 *"
            name="address_one"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-12 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="ที่อยู่ 2"
            name="address_two"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-4 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="ซอย"
            name="lane"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-4 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="ถนน"
            name="road"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-4 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="ตำบล/เขต *"
            name="sub_district"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-4 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="อำเภอ *"
            name="district"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-4 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="จังหวัด *"
            name="province"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-4 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="รหัสไปรษณีย์ *"
            name="postal_code"
            className="w-full bg-grey-100"
          />
        </div>
      </div>
      <hr className="font-semibold opacity-25 text-secondary2" />
      <div className="grid grid-cols-12 px-6 my-6 gap-x-8">
        <div className="col-span-12">
          <p className="font-semibold font-prompt text-heading-6">วันที่ทำการ</p>
        </div>
        <div className="col-span-2 mt-5">
          <FormControl className="w-full font-prompt bg-grey-100">
            <InputLabel htmlFor="company-type-select">วันเปิดทำการ *</InputLabel>
            <Controller
              control={control}
              name="start_business_day"
              as={
                <Select id="company-type-select">
                  {days.map((data) => (
                    <MenuItem key={data.day} value={data.day}>
                      {data.day}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </FormControl>
        </div>
        <div className="col-span-2 mt-5">
          <Controller
            as={
              <TextField
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
              />
            }
            control={control}
            label="เวลาเปิดทำการ *"
            name="start_business_time"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="flex items-end justify-center col-span-1">
          <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
        </div>
        <div className="col-span-2 mt-5">
          <FormControl className="w-full font-prompt bg-grey-100">
            <InputLabel htmlFor="company-type-select">วันปิดทำการ *</InputLabel>
            <Controller
              control={control}
              name="end_business_day"
              as={
                <Select id="company-type-select">
                  {days.map((data) => (
                    <MenuItem key={data.day} value={data.day}>
                      {data.day}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </FormControl>
        </div>
        <div className="col-span-2 mt-5">
          <Controller
            as={
              <TextField
                type="time"
                InputLabelProps={{
                  shrink: true
                }}
              />
            }
            control={control}
            label="เวลาปิดทำการ *"
            name="end_business_time"
            className="w-full bg-grey-100"
          />
        </div>
      </div>
      <hr className="font-semibold opacity-25 text-secondary2" />
      <div className="grid grid-cols-12 px-6 my-6 gap-x-8">
        <div className="col-span-12">
          <p className="font-semibold font-prompt text-heading-6">MOU</p>
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="ประเภท MOU"
            name="mou_type"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-6 mt-5">
          <Controller
            as={
              <TextField
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />
            }
            control={control}
            label="ระยะสัญญา"
            name="contact_period"
            className="w-full bg-grey-100"
          />
        </div>
        <div className="col-span-12 mt-5">
          <Controller
            as={TextField}
            control={control}
            label="MOU Link"
            name="mou_link"
            className="w-full bg-grey-100"
          />
        </div>
      </div>
      <div className="flex justify-end grid-cols-12 px-6 my-6 gap-x-8">
        <button onClick={context.handleModal} className="text-white bg-primary">
          <p className="px-5 py-2 font-prompt">บันทึก</p>
        </button>
      </div>
      <Dialog open={context.showModal} onClose={context.handleCloseModal}>
        <div className="p-4 text-left">
          <p className="mb-3 mr-40 font-prompt-medium text-heading-6">บันทึกข้อมูลบริษัท</p>
          <span className="mb-5 font-prompt text-subtitle-1">
            คุณต้องการบันทึกข้อมูลบริษัทหรือไม่
          </span>
          <DialogActions className="mt-4">
            <button onClick={context.handleCloseModal} className="text-secondary2">
              <p className="px-5 py-2 font-prompt">ยกเลิก</p>
            </button>
            <button onClick={handleSubmit(context.createCompany)} className="text-white bg-primary">
              <p className="px-5 py-2 font-prompt">บันทัก</p>
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  ))
}

export default CompanyForm
