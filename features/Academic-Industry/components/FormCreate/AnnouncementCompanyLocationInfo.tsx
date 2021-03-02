import { TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementCompanyLocationInfo = (props) => {
  const { errors, register } = props

  return (
    <div>
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
    </div>
  )
}

export default AnnouncementCompanyLocationInfo
