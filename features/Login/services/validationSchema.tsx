/* eslint-disable no-empty-character-class */
import * as yup from 'yup'

export const LoginFormSchema = yup.object().shape({
  username: yup.string().required('กรุณากรอก username'),
  password: yup.string().required('กรุณากรอก password')
})

export const VerificationFormSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'ต้องมีอย่างน้อย 8 ตัว')
    .matches(/[0-9]/, 'มีอักษร และตัวเลขปนกัน')
    .matches(/[a-z][A-Z]/, 'มีพิมพ์เล็ก และพิมพ์ใหญ่ปนกัน')
    .matches(/!@#$%^&*()_+|~-=`{}[]:";'<>?,./, 'มีอักขระพิเศษอย่างน้อย 1 ตัว')
    .required('กรุณากรอก password'),
  confirm_password: yup
    .string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
    .oneOf([yup.ref('password'), null], 'รหัสผ่านและรหัสผ่านที่ยืนยันไม่ตรงกัน กรุณากรอกให้ตรงกัน')
    .required('กรุณากรอก password')
})
