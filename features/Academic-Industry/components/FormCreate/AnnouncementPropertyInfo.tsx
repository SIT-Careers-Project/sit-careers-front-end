import { FormControl, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'

const AnnouncementPropertyInfoForm = (props) => {
  const { errors, register, data } = props

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [data, register])

  return (
    <div className="flex flex-col pb-6">
      <p className="mb-4 font-semibold font-prompt text-heading-6">คุณสมบัติ</p>
      <FormControl className="w-full font-prompt">
        <TextField
          label="คุณสมบัติ *"
          className="border-opacity-50 place-content-start border-DEFAULT"
          variant="outlined"
          defaultValue={data?.announcement?.property || ''}
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
