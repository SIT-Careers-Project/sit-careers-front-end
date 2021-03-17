import * as yup from 'yup'

const FILE_SIZE = 5242880
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
const SUPPORTED_FORMATS_RESUME = ['image/png', 'application/pdf']

export const AnnouncementFormSchema = yup.object().shape({
  announcement_id: yup.string(),
  file_picture: yup
    .mixed()
    .notRequired()
    .test('fileSize', 'ไฟล์นามสกุล .png และ .jpg ต้องมีขนาดไม่เกิน 5MB', (value) => {
      console.log(value.length)
      if (value.length !== 0) {
        return value && value[0].size <= FILE_SIZE
      } else {
        return true
      }
    })
    .test('fileFormat', 'ไฟล์ต้องเป็นนามสกุล .jpg .jpeg .gif และ .png', (value) => {
      if (value.length !== 0) {
        return value && SUPPORTED_FORMATS.includes(value[0].type)
      } else {
        return true
      }
    }),
  company_id: yup.string().required('*จำเป็นต้องกรอก บริษัทที่ต้องการสร้างประกาศรับสมัครงาน'),
  address_one: yup.string().required('*จำเป็นต้องกรอก ที่อยู่ 1'),
  address_two: yup.string(),
  lane: yup.string(),
  road: yup.string(),
  sub_district: yup.string().required('*จำเป็นต้องกรอก ตำบล/เขต'),
  district: yup.string().required('*จำเป็นต้องกรอก อำเภอ'),
  province: yup.string().required('*จำเป็นต้องกรอก จังหวัด'),
  postal_code: yup
    .string()
    .matches(/[0-9]/g, '*กรอกเพียงตัวเลขเท่านั้น')
    .max(5)
    .min(5)
    .required('*จำเป็นต้องกรอก รหัสไปรษณีย์'),
  start_business_day: yup.string().required('*จำเป็นต้องกรอก วันเปิดทำการ'),
  start_business_time: yup.string().required('*จำเป็นต้องกรอก เวลาเปิดทำการ'),
  end_business_day: yup.string().required('*จำเป็นต้องกรอก วันปิดทำการ'),
  end_business_time: yup.string().required('*จำเป็นต้องกรอก เวลาปิดทำการ'),
  announcement_title: yup.string().required('*จำเป็นต้องกรอก หัวข้อประกาศ'),
  job_description: yup.string().required('*จำเป็นต้องกรอก รายละเอียดงาน'),
  job_position_id: yup.string().required('*จำเป็นต้องกรอก ประเภทของงาน'),
  property: yup.string().required('*จำเป็นต้องกรอก คุณสมบัติ'),
  salary: yup.string().required('*จำเป็นต้องกรอก เงินเดือน'),
  start_date: yup.string().required('*จำเป็นต้องกรอก วันประกาศรับสมัคร'),
  end_date: yup.string().required('*จำเป็นต้องกรอก วันปิดรับสมัคร'),
  welfare: yup.string().required('*จำเป็นต้องกรอก สวัสดิการ'),
  job_type: yup.string().required('*จำเป็นต้องเลือก ประเภทของประกาศ'),
  status: yup.string()
})

export const ApplicationFormSchema = yup.object().shape({
  announcement_id: yup.string().required('*จำเป็นต้องกรอก วันประกาศรับสมัคร'),
  status: yup.string(),
  first_name: yup.string().required('*จำเป็นต้องกรอก ชื่อ'),
  last_name: yup.string().required('*จำเป็นต้องกรอก นามสกุล'),
  curriculum: yup.string().required('*จำเป็นต้องกรอก สาขาวิชา'),
  year: yup.string().required('*จำเป็นต้องกรอก ชั้นปี'),
  tel_no: yup.string().required('*จำเป็นต้องกรอก เบอร์โทรศัพท์'),
  email: yup.string().required('*จำเป็นต้องกรอก email'),
  resume_link: yup.string().required('*จำเป็นต้องกรอก resume link'),
  prefix: yup.string().required('*จำเป็นต้องกรอก คำนำหน้า'),
  file_resume: yup
    .mixed()
    .notRequired()
    .test('fileSize', 'ไฟล์ต้องมีขนาดไม่เกินใหญ่เกินไป ต้องมีขนาดไม่เกิน 5MB', (value) => {
      console.log(value.length)
      if (value.length !== 0) {
        return value && value[0].size <= FILE_SIZE
      } else {
        return true
      }
    })
    .test('fileFormat', 'ไฟล์ต้องเป็นนามสกุล .jpg .jpeg .gif และ .png', (value) => {
      if (value.length !== 0) {
        return value && SUPPORTED_FORMATS_RESUME.includes(value[0].type)
      } else {
        return true
      }
    })
})
