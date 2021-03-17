import { FormControl, TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementPropertyInfoForm = (props) => {
  const { errors, register } = props

  return (
    <div className="flex flex-col pb-6">
      <p className="mb-4 font-semibold font-prompt text-heading-6">คุณสมบัติ</p>
      <FormControl className="w-full font-prompt">
        <TextField
          label="คุณสมบัติ *"
          className="border-opacity-50 place-content-start border-DEFAULT"
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
  )
}

export default AnnouncementPropertyInfoForm
