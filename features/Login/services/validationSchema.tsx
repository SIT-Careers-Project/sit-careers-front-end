import * as yup from 'yup'

export const LoginFormSchema = yup.object().shape({
  username: yup.string().required('กรุณากรอก username'),
  password: yup.string().required('กรุณากรอก password')
})

export const VerificationFormSchema = yup.object().shape({
  password: yup.string().required('กรุณากรอก password'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'รหัสผ่านและรหัสผ่านที่ยืนยันไม่ตรงกัน กรุณากรอกให้ตรงกัน')
    .required('กรุณากรอก password')
})
