import * as yup from 'yup'

export const AnnouncementFormSchema = yup.object().shape({
  announcement_id: yup.string(),
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
  job_position_id: yup.string(),
  property: yup.string().required('*จำเป็นต้องกรอก คุณสมบัติ'),
  salary: yup.string().required('*จำเป็นต้องกรอก เงินเดือน'),
  start_date: yup.string().required('*จำเป็นต้องกรอก วันประกาศรับสมัคร'),
  end_date: yup.string().required('*จำเป็นต้องกรอก วันปิดรับสมัคร'),
  welfare: yup.string().required('*จำเป็นต้องกรอก สวัสดิการ'),
  job_type: yup.string().required('*จำเป็นต้องเลือก ประเภทของประกาศ'),
  status: yup.string()
})
