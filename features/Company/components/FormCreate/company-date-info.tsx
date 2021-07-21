import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import React from 'react'
import { Controller } from 'react-hook-form'
import { days } from '../../services/constantVariable'

const CompanyDateInfoForm = (props) => {
  const { errors, register, control, disable } = props

  return (
    <div>
      <p className="mb-3 font-semibold font-prompt text-heading-6">วันที่ทำการ</p>
      <div className="flex flex-row pb-6">
        <div className="w-4/12 pr-3">
          <FormControl
            error={!!errors?.start_business_day}
            className="w-full font-prompt"
            variant="outlined"
            disabled={disable}>
            <InputLabel htmlFor="start-business-day-select" id="select-outlined-label">
              วันเปิดทำการ *
            </InputLabel>
            <Controller
              control={control}
              name="start_business_day"
              as={
                <Select id="select-outlined-label">
                  {days.map((data) => (
                    <MenuItem key={data.day} value={data.day}>
                      {data.day}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
            <FormHelperText>{errors.start_business_day?.message}</FormHelperText>
          </FormControl>
        </div>
        <div className="w-4/12 pl-3 pr-3">
          <TextField
            name="start_business_time"
            variant="outlined"
            label="เวลาเปิดทำการ *"
            className="font-sarabun"
            type="time"
            InputLabelProps={{
              shrink: true
            }}
            inputRef={register}
            error={!!errors.start_business_time}
            helperText={errors.start_business_time?.message}
            fullWidth
            disabled={disable}
          />
        </div>
        <div className="flex items-end justify-center col-span-1">
          <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
        </div>
        <div className="w-4/12 pl-3 pr-3">
          <FormControl
            error={!!errors?.end_business_day}
            className="w-full font-prompt"
            variant="outlined"
            disabled={disable}>
            <InputLabel htmlFor="end-business-day-select" id="select-outlined-label">
              วันปิดทำการ *
            </InputLabel>
            <Controller
              control={control}
              name="end_business_day"
              as={
                <Select id="select-outlined-label">
                  {days.map((data) => (
                    <MenuItem key={data.day} value={data.day}>
                      {data.day}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
            <FormHelperText>{errors.end_business_day?.message}</FormHelperText>
          </FormControl>
        </div>
        <div className="w-4/12 pl-3">
          <TextField
            name="end_business_time"
            variant="outlined"
            label="เวลาปิดทำการ *"
            className="font-sarabun"
            type="time"
            InputLabelProps={{
              shrink: true
            }}
            inputRef={register}
            error={!!errors.end_business_time}
            helperText={errors.end_business_time?.message}
            fullWidth
            disabled={disable}
          />
        </div>
      </div>
    </div>
  )
}

export default CompanyDateInfoForm
