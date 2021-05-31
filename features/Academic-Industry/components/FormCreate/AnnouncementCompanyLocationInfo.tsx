import { TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementCompanyLocationInfo = (props) => {
  const { errors, register, data } = props

  return (
    <div>
      <p className="mb-3 font-semibold font-prompt text-heading-6">สถานที่ปฏิบัติการ</p>
      <div className="w-full">
        <TextField
          label="ที่อยู่ 1 *"
          name="address_one"
          variant="outlined"
          className="font-sarabun"
          inputRef={register}
          error={!!errors.address_one}
          helperText={errors.address_one?.message}
          defaultValue={data?.announcement?.address_one || ''}
          fullWidth
        />
      </div>
      <div className="w-full my-6">
        <TextField
          label="ที่อยู่ 2"
          name="address_two"
          variant="outlined"
          className="font-sarabun"
          inputRef={register}
          error={!!errors.address_two}
          helperText={errors.address_two?.message}
          defaultValue={data?.announcement?.address_two || ''}
          fullWidth
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-4/12 pr-3">
          <TextField
            label="ซอย"
            name="lane"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.lane}
            helperText={errors.lane?.message}
            defaultValue={data?.announcement?.lane || ''}
            fullWidth
          />
        </div>
        <div className="w-4/12 pl-3 pr-3">
          <TextField
            name="road"
            label="ถนน"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.road}
            helperText={errors.road?.message}
            defaultValue={data?.announcement?.road || ''}
            fullWidth
          />
        </div>
        <div className="w-4/12 pl-3">
          <TextField
            name="sub_district"
            label="ตำบล/เขต *"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.sub_district}
            helperText={errors.sub_district?.message}
            defaultValue={data?.announcement?.sub_district || ''}
            fullWidth
          />
        </div>
      </div>
      <div className="flex flex-row justify-between pb-3 mt-6">
        <div className="w-4/12 pr-3">
          <TextField
            name="district"
            label="อำเภอ *"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.district}
            helperText={errors.district?.message}
            defaultValue={data?.announcement?.district || ''}
            fullWidth
          />
        </div>
        <div className="w-4/12 px-3">
          <TextField
            name="province"
            label="จังหวัด *"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.province}
            helperText={errors.province?.message}
            defaultValue={data?.announcement?.province || ''}
            fullWidth
          />
        </div>
        <div className="w-4/12 pl-3">
          <TextField
            name="postal_code"
            label="รหัสไปรษณีย์ *"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.postal_code}
            helperText={errors.postal_code?.message}
            defaultValue={data?.announcement?.postal_code || ''}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCompanyLocationInfo
