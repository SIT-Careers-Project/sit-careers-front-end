import { TextField } from '@material-ui/core'
import React from 'react'

const LocationInfoForm = (props) => {
  const { errors, register, disable } = props

  return (
    <div>
      <p className="mb-3 font-semibold font-prompt text-heading-6">สถานที่ทำการ</p>
      <div className="w-full">
        <TextField
          label="ที่อยู่ 1"
          name="address_one"
          variant="outlined"
          className="font-sarabun"
          inputRef={register}
          error={!!errors.address_one}
          helperText={errors.address_one?.message}
          fullWidth
          disabled={disable}
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
          fullWidth
          disabled={disable}
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
            fullWidth
            disabled={disable}
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
            fullWidth
            disabled={disable}
          />
        </div>
        <div className="w-4/12 pl-3">
          <TextField
            name="sub_district"
            label="ตำบล/เขต"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.sub_district}
            helperText={errors.sub_district?.message}
            fullWidth
            disabled={disable}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between pb-6 mt-6">
        <div className="w-4/12 pr-3">
          <TextField
            name="district"
            label="อำเภอ"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.district}
            helperText={errors.district?.message}
            fullWidth
            disabled={disable}
          />
        </div>
        <div className="w-4/12 pl-3 px-3">
          <TextField
            name="province"
            label="จังหวัด"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.province}
            helperText={errors.province?.message}
            fullWidth
            disabled={disable}
          />
        </div>
        <div className="w-4/12 pl-3">
          <TextField
            name="postal_code"
            label="รหัสไปรษณีย์"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.postal_code}
            helperText={errors.postal_code?.message}
            fullWidth
            disabled={disable}
          />
        </div>
      </div>
    </div>
  )
}

export default LocationInfoForm
