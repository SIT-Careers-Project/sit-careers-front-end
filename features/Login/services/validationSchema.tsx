import * as yup from 'yup'

export const LoginFormSchema = yup.object().shape({
  username: yup.string().required('กรุณากรอก username'),
  password: yup.string().required('กรุณากรอก password')
})
