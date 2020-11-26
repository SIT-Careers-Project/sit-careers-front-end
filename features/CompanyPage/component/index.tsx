import { Controller, useForm } from 'react-hook-form'

import { Avatar } from '../../../core/components/Avatar'
import React from 'react'
import TextField from '@material-ui/core/TextField'

const Index = () => {
  const { control, handleSubmit, register, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 pt-6">
          <p className="font-semibold font-prompt text-heading-6">ข้อมูลส่วนตัว</p>
          <Avatar className="mt-5 bg-grey-100" />
        </div>
        <div className="grid grid-cols-12 p-6 gap-x-8">
          <div className="col-span-6 mt-5">
            <Controller
              as={TextField}
              label="ชื่อภาษาไทย *"
              name="company_name_th"
              control={control}
              className="w-full font-prompt bg-grey-100"
            />
            <div className="mt-5">
              <Controller
                as={TextField}
                label="ประเภทธุรกิจ*"
                name="type_of_business"
                control={control}
                className="w-full mt-5 bg-grey-100"
              />
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
            <textarea
              className="w-full h-40 border-opacity-50 placeholder-secondary2 border-secondary2 place-content-start bg-grey-100 border-DEFAULT"
              placeholder="รายละเอียด"
              aria-invalid={errors.description ? 'true' : 'false'}
              name="description"
              ref={register({ required: true })}
            />
          </div>
        </div>
        <hr className="font-semibold opacity-25 text-secondary2" />
        <div className="grid grid-cols-12 px-6 my-6 gap-x-8">
          <div className="col-span-12">
            <p className="font-semibold font-prompt text-heading-6">ข้อมูลส่วนตัว</p>
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
              label="เบอร์ส่วนตัว"
              name="phone_no"
              className="w-full bg-grey-100"
            />
          </div>
          <div className="col-span-6 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="เบอร์ส่วนตัว"
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
              name="raod"
              className="w-full bg-grey-100"
            />
          </div>
          <div className="col-span-4 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="ตำบล/เขต"
              name="sub_district"
              className="w-full bg-grey-100"
            />
          </div>
          <div className="col-span-4 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="อำเภอ"
              name="district"
              className="w-full bg-grey-100"
            />
          </div>
          <div className="col-span-4 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="จังหวัด"
              name="province"
              className="w-full bg-grey-100"
            />
          </div>
          <div className="col-span-4 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="รหัสไปรษณีย์"
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
          <div className="col-span-4 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="เปิดทำการ *"
              name="e_mail_manager"
              className="w-full bg-grey-100"
            />
          </div>
          <div className="flex items-end justify-center col-span-1">
            <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
          </div>
          <div className="col-span-4 mt-5">
            <Controller
              as={TextField}
              control={control}
              label="อีเมล์ผู้ประสานงาน *"
              name="e_mail_coordinator"
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
              as={TextField}
              control={control}
              label="ระยะสัญญา"
              name="e_mail_coordinator"
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
          <button className="text-white bg-primary">
            <p className="px-5 py-2 font-prompt">บันทัก</p>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Index
