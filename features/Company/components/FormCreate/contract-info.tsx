import { TextField } from '@material-ui/core'
import React from 'react'

const ContractInfoForm = (props) => {
  const { errors, register } = props

  return (
    <div>
      <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">ข้อมูลติดต่อ</p>
      <div className="flex flex-row justify-between px-6">
        <div className="w-1/2 pb-6 pr-3">
          <TextField
            label="อีเมล์ผู้จัดการ *"
            name="e_mail_manager"
            className="font-sarabun bg-grey-100"
            inputRef={register}
            error={!!errors.e_mail_manager}
            helperText={errors.e_mail_manager?.message}
            fullWidth
          />
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label="อีเมล์ผู้ประสานงาน *"
            name="e_mail_coordinator"
            className="font-sarabun bg-grey-100"
            inputRef={register}
            error={!!errors.e_mail_coordinator}
            helperText={errors.e_mail_coordinator?.message}
            fullWidth
          />
        </div>
      </div>
      <p className="mb-3 ml-6 font-semibold font-prompt text-heading-6">เบอร์ติดต่อ</p>
      <div className="flex flex-row justify-between px-6 pb-6">
        <div className="w-1/2 pr-3">
          <TextField
            label="เบอร์สำนักงาน *"
            name="tel_no"
            className="font-sarabun bg-grey-100"
            inputRef={register}
            error={!!errors.tel_no}
            helperText={errors.tel_no?.message}
            fullWidth
          />
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label="เบอร์ผู้ประสานงาน *"
            name="phone_no"
            className="font-sarabun bg-grey-100"
            type="phone"
            inputRef={register}
            error={!!errors.phone_no}
            helperText={errors.phone_no?.message}
            fullWidth
          />
        </div>
      </div>
    </div>
  )
}

export default ContractInfoForm
