import { TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementDateInfoForm = (props) => {
  const { errors, register, startDate, endDate, changeStartDate, changeEndDate } = props

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-5 bg-white shadow-lg rounded-lg font-prompt p-10">
      <div>
        <p className="font-semibold font-prompt text-heading-6">วันประกาศรับสมัคร</p>
      </div>
      <div className="flex flex-row pb-3 pt-5">
        <div className="pr-6">
          <TextField
            id="datetime-local"
            label="เปิดรับสมัคร *"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true
            }}
            name="start_date"
            value={startDate}
            onChange={changeStartDate}
            inputRef={register}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
          />
        </div>
        <div className="flex items-end justify-center pr-6">
          <p className="font-semibold text-heading-6 font-prompt">ถึง</p>
        </div>
        <div className="pr-6">
          <TextField
            id="datetime-local"
            label="ปิดรับสมัคร *"
            variant="outlined"
            type="datetime-local"
            InputLabelProps={{
              shrink: true
            }}
            name="end_date"
            value={endDate}
            onChange={changeEndDate}
            inputRef={register}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
          />
        </div>
        <div className="flex justify-end w-2/4 grid-cols-12">
          <button className="text-white bg-red">
            <p className="px-5 text-white font-prompt text-subtitle-1">ปิดรับสมัคร</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDateInfoForm
