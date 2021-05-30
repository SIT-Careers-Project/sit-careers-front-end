import { FormControl, TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementWalfareInfoForm = (props) => {
  const { errors, register, data } = props

  return (
    <div className="flex flex-col pb-3">
      <p className="mb-4 font-semibold font-prompt text-heading-6">สวัสดิการ</p>
      <FormControl className="w-full font-prompt">
        <TextField
          label="สวัสดิการ *"
          className="border-opacity-50 place-content-start border-DEFAULT"
          variant="outlined"
          defaultValue={data?.announcement?.welfare || ''}
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
