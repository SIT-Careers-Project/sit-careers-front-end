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

const AnnouncementBusinessDateInfo = (props) => {
  const { errors, register, control } = props

  return (
    <div>
      <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">วันที่ทำการ</p>
      <div className="flex flex-row pb-6">
        <div className="w-4/12 pl-6 pr-3">
          <FormControl
            error={!!errors?.start_business_day}
            className="w-full font-prompt bg-grey-100">
            <InputLabel htmlFor="start-business-day-select">วันเปิดทำการ *</InputLabel>
            <Controller
              control={control}
              id="start-business-day-select"
              name="start_business_day"
              as={
                <Select id="trinity-select">
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
            label="เวลาเปิดทำการ *"
            className="font-sarabun bg-grey-100"
            type="time"
            InputLabelProps={{
              shrink: true
            }}
            inputRef={register}
            error={!!errors.start_business_time}
            helperText={errors.start_business_time?.message}
            fullWidth
          />
        </div>
        <div className="flex items-end justify-center col-span-1">
          <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
        </div>
        <div className="w-4/12 pl-3 pr-3">
          <FormControl error={!!errors.end_business_day} className="w-full font-prompt bg-grey-100">
            <InputLabel htmlFor="end-business-day-select">วันปิดทำการ *</InputLabel>
            <Controller
              control={control}
              id="end-business-day-select"
              name="end_business_day"
              as={
                <Select id="trinity-select">
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
        <div className="w-4/12 pl-3 pr-6">
          <TextField
            name="end_business_time"
            label="เวลาปิดทำการ *"
            className="font-sarabun bg-grey-100"
            type="time"
            InputLabelProps={{
              shrink: true
            }}
            inputRef={register}
            error={!!errors.end_business_time}
            helperText={errors.end_business_time?.message}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBusinessDateInfo
