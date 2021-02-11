import { TextField } from '@material-ui/core'
import React from 'react'

const MouInfoForm = (props) => {
  const { errors, register } = props

  return (
    <div>
      <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">MOU</p>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 pl-6 pr-3">
          <TextField
            label="ประเภท MOU"
            name="mou_type"
            className="font-sarabun bg-grey-100"
            inputRef={register}
            error={!!errors.mou_type}
            helperText={errors.mou_type?.message}
            fullWidth
          />
        </div>
        <div className="w-1/2 pl-3 pr-6">
          <TextField
            label="ระยะสัญญา"
            name="contact_period"
            className="font-sarabun bg-grey-100"
            type="date"
            inputRef={register}
            error={!!errors.contact_period}
            helperText={errors.contact_period?.message}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </div>
      </div>
      <div className="p-6">
        <TextField
          label="MOU Link"
          name="mou_link"
          className="font-sarabun bg-grey-100"
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
