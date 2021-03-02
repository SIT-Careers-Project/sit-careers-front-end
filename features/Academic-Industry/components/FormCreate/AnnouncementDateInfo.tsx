import { TextField } from '@material-ui/core'
import React from 'react'

const AnnouncementDateInfoForm = (props) => {
  const { errors, register } = props

  return (
    <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
      <div className="px-6 pt-6">
        <p className="font-semibold font-prompt text-heading-6">วันประกาศรับสมัคร</p>
      </div>
      <div className="flex flex-row px-6 py-6">
        <div className="pr-6">
          <TextField
            id="datetime-local"
            label="เปิดรับสมัคร *"
            type="datetime-local"
            InputLabelProps={{
              shrink: true
            }}
            name="start_date"
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
            type="datetime-local"
            InputLabelProps={{
              shrink: true
            }}
            name="end_date"
            inputRef={register}
            error={!!errors.end_date}
            helperText={errors.end_date?.message}
          />
        </div>
        <div className="flex justify-end w-2/4 grid-cols-12">
          <button className="text-white bg-red">
            <p className="px-5 py-3 text-white font-prompt text-subtitle-1">ปิดรับสมัคร</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDateInfoForm
