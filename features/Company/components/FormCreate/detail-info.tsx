import { FormControl, TextField } from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'

const DetailInfoForm = (props) => {
  const { errors, control, disable } = props

  return (
    <div className="flex flex-col pb-6">
      <p className="mb-5 font-semibold font-prompt text-heading-6">รายละเอียดบริษัท</p>
      <FormControl error={!!errors?.description} className="w-full font-prompt">
        <Controller
          control={control}
          name="description"
          data-cy="description"
          as={
            <TextField
              label="รายละเอียด *"
              name="description"
              className="border-opacity-50 place-content-start border-DEFAULT"
              variant="outlined"
              defaultValue=""
              error={!!errors.description}
              helperText={errors.description?.message}
              rows={5}
              multiline
              fullWidth
              disabled={disable}
            />
          }
        />
      </FormControl>
    </div>
  )
}

export default DetailInfoForm
