import { TextField } from '@material-ui/core'
import React from 'react'

const MouInfoForm = (props) => {
  const { errors, register } = props

  return (
    <div>
      <p className="mb-3 font-semibold font-prompt text-heading-6">MOU</p>
      <div className="flex flex-row justify-between">
        <div className="w-full">
          <TextField
            label="ประเภท MOU"
            variant="outlined"
            name="mou_type"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.mou_type}
            helperText={errors.mou_type?.message}
            fullWidth
          />
        </div>
      </div>
      <div className="py-6 flex flex-row">
        <div className="w-1/2">
          <TextField
            label="เริ่มสัญญา"
            variant="outlined"
            name="start_date_mou"
            className="font-sarabun"
            type="date"
            inputRef={register}
            error={!!errors.start_date_mou}
            helperText={errors.start_date_mou?.message}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </div>
        <div className="flex items-end justify-center col-span-1 px-5">
          <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
        </div>
        <div className="w-1/2">
          <TextField
            label="สิ้นสุดสัญญา"
            variant="outlined"
            name="end_date_mou"
            className="font-sarabun"
            type="date"
            inputRef={register}
            error={!!errors.end_date_mou}
            helperText={errors.end_date_mou?.message}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </div>
      </div>
      <div>
        <TextField
          label="MOU Link"
          variant="outlined"
          name="mou_link"
          className="font-sarabun"
          inputRef={register}
          error={!!errors.mou_link}
          helperText={errors.mou_link?.message}
          fullWidth
        />
      </div>
    </div>
  )
}

export default MouInfoForm
