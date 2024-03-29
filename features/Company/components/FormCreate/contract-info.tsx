import { TextField } from '@material-ui/core'
import React from 'react'

const ContractInfoForm = (props) => {
  const { errors, register, disable, contract, require } = props

  return (
    <div>
      <p className="mb-3 font-semibold font-prompt text-heading-6">ข้อมูลติดต่อ</p>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 pb-6 pr-3">
          {contract ? (
            <TextField
              label={`อีเมล์ผู้จัดการ ${require ? '*' : ''}`}
              name="e_mail_manager"
              variant="outlined"
              className="font-sarabun"
              inputRef={register}
              error={!!errors.e_mail_manager}
              helperText={errors.e_mail_manager?.message}
              fullWidth
              disabled={true}
            />
          ) : (
            <TextField
              label={`อีเมล์ผู้จัดการ ${require ? '*' : ''}`}
              name="e_mail_manager"
              variant="outlined"
              className="font-sarabun"
              inputRef={register}
              error={!!errors.e_mail_manager}
              helperText={errors.e_mail_manager?.message}
              fullWidth
              disabled={disable}
            />
          )}
          {/* <TextField
            label="อีเมล์ผู้จัดการ"
            name="e_mail_manager"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.e_mail_manager}
            helperText={errors.e_mail_manager?.message}
            fullWidth
            disabled={disable}
          /> */}
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label={`อีเมล์ผู้ประสานงาน ${require ? '*' : ''}`}
            name="e_mail_coordinator"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.e_mail_coordinator}
            helperText={errors.e_mail_coordinator?.message}
            fullWidth
            disabled={disable}
          />
        </div>
      </div>
      <p className="mb-3 font-semibold font-prompt text-heading-6">เบอร์ติดต่อ</p>
      <div className="flex flex-row justify-between pb-6">
        <div className="w-1/2 pr-3">
          <TextField
            label={`เบอร์สำนักงาน ${require ? '*' : ''}`}
            name="tel_no"
            variant="outlined"
            className="font-sarabun"
            inputRef={register}
            error={!!errors.tel_no}
            helperText={errors.tel_no?.message}
            fullWidth
            disabled={disable}
          />
        </div>
        <div className="w-1/2 pl-3">
          <TextField
            label={`เบอร์ผู้ประสานงาน ${require ? '*' : ''}`}
            name="phone_no"
            variant="outlined"
            className="font-sarabun"
            type="phone"
            inputRef={register}
            error={!!errors.phone_no}
            helperText={errors.phone_no?.message}
            fullWidth
            disabled={disable}
          />
        </div>
      </div>
    </div>
  )
}

export default ContractInfoForm
