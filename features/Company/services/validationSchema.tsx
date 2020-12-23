import * as yup from 'yup'

export const CompanyFormSchema = yup.object().shape({
  // logo: yup
  //   .mixed()
  //   .test(
  //     'type',
  //     'We only support jpeg',
  //     (value) => !value || (value && value[0].type === 'image/jpeg')
  //   ),
  company_name_th: yup
    .string()
    .matches(/[^a-zA-Z0-9]/, '*จำเป็นต้องกรอก ชื่อภาษาไทย และต้องกรอกเป็นภาษาไทยเท่านั้น')
    .required('*จำเป็นต้องกรอก ชื่อภาษาไทย'),
  company_name_en: yup
    .string()
    .matches(/[a-zA-Z0-9]/, '*จำเป็นต้องกรอก ชื่ออังกฤษ และต้องกรอกเป็นภาษาอังกฤษเท่านั้น')
    .required('*จำเป็นต้องกรอก ชื่ออังกฤษ'),
  company_type: yup.string().required('*จำเป็นต้องกรอก ประเภทบริษัท'),
  website: yup.string(),
  about_us: yup
    .string()
    .min(1)
    .max(200, '*กรอก แนะนำบริษัท จำนวนตัวอักษรไม่เกิน 200 ตัวอักษร')
    .required('*จำเป็นต้องกรอก แนะนำบริษัท และจำนวนตัวอักษรไม่เกิน 200 ตัวอักษร'),
  description: yup
    .string()
    .min(1)
    .max(200)
    .required('*จำเป็นต้องกรอก รายละเอียด และจำนวนตัวอักษรไม่เกิน 200 ตัวอักษร'),
  e_mail_manager: yup.string().email().required('*จำเป็นต้องกรอก อีเมล์ผู้จัดการ'),
  e_mail_coordinator: yup.string().email().required('*จำเป็นต้องกรอก อีเมล์ผู้ประสานงาน'),
  tel_no: yup.string().matches(/[0-9]/g, 'กรอกเพียงตัวเลขเท่านั้น').max(10).notRequired(),
  phone_no: yup.string().matches(/[0-9]/g, 'กรอกเพียงตัวเลขเท่านั้น').max(10).notRequired(),
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
  mou_type: yup.string(),
  mou_link: yup.string()
  contact_period: yup.string(),
})
