import * as yup from 'yup'
const FILE_SIZE = 5242880
const SUPPORTED_FORMATS_RESUME = ['application/pdf']
export const ResumeFormSchema = yup.object().shape({
  first_name: yup.string().required('*จำเป็นต้องกรอก ชื่อ'),
  last_name: yup.string().required('*จำเป็นต้องกรอก นามสกุล'),
  curriculum: yup.string().required('*จำเป็นต้องกรอก สาขาวิชา'),
  year: yup.string().required('*จำเป็นต้องกรอก ชั้นปี'),
  tel_no: yup.string().required('*จำเป็นต้องกรอก เบอร์โทรศัพท์'),
  email: yup.string().required('*จำเป็นต้องกรอก email'),
  resume_link: yup.string().required('*จำเป็นต้องกรอก resume link'),
  name_title: yup.string().required('*จำเป็นต้องกรอก คำนำหน้า'),
  path_file: yup.string(),
  file_resume: yup
    .mixed()
    .notRequired()
    .test('fileSize', 'ไฟล์ต้องมีขนาดไม่เกิน 5MB', (value) => {
      console.log(value.length)
      if (value.length !== 0) {
        return value && value[0].size <= FILE_SIZE
      } else {
        return true
      }
    })
    .test('fileFormat', 'ไฟล์ต้องเป็นนามสกุล .pdf', (value) => {
      if (value.length !== 0) {
        return value && SUPPORTED_FORMATS_RESUME.includes(value[0].type)
      } else {
        return true
      }
    })
})
