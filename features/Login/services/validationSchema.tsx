/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-character-class */
import * as yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(yup)

export const LoginFormSchema = yup.object().shape({
  username: yup.string().required('กรุณากรอก username'),
  password: yup.string().required('กรุณากรอก password')
})

export const VerificationFormSchema = yup.object().shape({
  password: yup
    .string()
    .password()
    .min(8, 'ตัวอักษรอย่างน้อย 8 ตัว')
    .minUppercase(1, 'ภาษาอังกฤษตัวพิมพ์ใหญ่ เช่น A, B, C')
    .minLowercase(1, 'ภาษาอังกฤษตัวพิมพ์เล็ก เช่น a, b, c')
    .minNumbers(1, 'ต้องมีตัวเลขเช่น 1, 2, 3')
    .minSymbols(1, `อักขระพิเศษ ~!@#$%^&*( )_+-={ }|[ ]:";'< >?,./`)
    .required('กรุณากรอก password'),
  confirm_password: yup
    .string()
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว')
    .oneOf([yup.ref('password'), null], 'รหัสผ่านและรหัสผ่านที่ยืนยันไม่ตรงกัน กรุณากรอกให้ตรงกัน')
    .required('กรุณากรอก password')
})
