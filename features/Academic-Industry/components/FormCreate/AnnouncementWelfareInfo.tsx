import { FormControl, TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementWalfareInfoForm = (props) => {
  const { errors, register } = props

  return (
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
  )
}

export default AnnouncementWalfareInfoForm
