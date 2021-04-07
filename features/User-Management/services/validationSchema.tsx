import * as yup from 'yup'

export const UserFormSchema = yup.object().shape({
  company_id: yup.string(),
  email: yup.string().email().required('*จำเป็นต้องกรอก อีเมล์'),
  role_id: yup.string().required('*จำเป็นต้องเลือกบทบาทผู้ใช้')
})
