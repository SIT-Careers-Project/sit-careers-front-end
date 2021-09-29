import * as yup from 'yup'

export const CompanyFormSchema = yup.object().shape({
  company_id: yup.string(),
  // company_logo_image: yup
  //   .mixed()
  //   .notRequired()
  //   .test('fileSize', 'File Size is too large', (value) => value.size <= 50000)
  //   .test('fileType', 'Unsupported File Format', (value) =>
  //     ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
  //   ),
  company_name_th: yup.string(),
  company_name_en: yup
    .string()
    .matches(/[a-zA-Z0-9]/, '*จำเป็นต้องกรอก ชื่ออังกฤษ และต้องกรอกเป็นภาษาอังกฤษเท่านั้น'),
  company_type: yup
    .string()
    .typeError('*จำเป็นต้องกรอก ประเภทบริษัท')
    .required('*จำเป็นต้องกรอก ประเภทบริษัท'),
  website: yup.string().required('*จำเป็นต้องกรอก เว็บไซต์บริษัท'),
  about_us: yup
    .string()
    .min(1)
    .max(500, '*กรอก แนะนำบริษัท จำนวนตัวอักษรไม่เกิน 500 ตัวอักษร')
    .typeError('*จำเป็นต้องกรอก แนะนำบริษัท')
    .required('*จำเป็นต้องกรอก แนะนำบริษัท และจำนวนตัวอักษรไม่เกิน 500 ตัวอักษร'),
  description: yup
    .string()
    .min(1)
    .max(500)
    .typeError('*จำเป็นต้องกรอก รายละเอียด')
    .required('*จำเป็นต้องกรอก รายละเอียด และจำนวนตัวอักษรไม่เกิน 500 ตัวอักษร'),
  e_mail_manager: yup.string().email().required('*จำเป็นต้องกรอก อีเมล์ผู้จัดการ'),
  e_mail_coordinator: yup.string().email().required('*จำเป็นต้องกรอก อีเมล์ผู้ประสานงาน'),
  tel_no: yup
    .string()
    .matches(/[0-9]/g, 'กรอกเพียงตัวเลขเท่านั้น')
    .max(10)
    .required('*จำเป็นต้องกรอก เบอร์สำนักงาน'),
  phone_no: yup
    .string()
    .matches(/[0-9]/g, 'กรอกเพียงตัวเลขเท่านั้น')
    .max(10)
    .required('*จำเป็นต้องกรอก เบอร์ผู้ประสานงาน'),
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
  start_business_day: yup.string(),
  start_business_time: yup.string(),
  end_business_day: yup.string(),
  end_business_time: yup.string(),
  mou_type: yup.string(),
  mou_link: yup.string(),
  start_date_mou: yup.string(),
  end_date_mou: yup.string()
})

export const CompanyAdminSchema = yup.object().shape({
  company_id: yup.string(),
  // company_logo_image: yup
  //   .mixed()
  //   .notRequired()
  //   .test('fileSize', 'File Size is too large', (value) => value.size <= 50000)
  //   .test('fileType', 'Unsupported File Format', (value) =>
  //     ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value.type)
  //   ),
  company_name_th: yup.string(),
  company_name_en: yup
    .string()
    .matches(/[a-zA-Z0-9]/, '*จำเป็นต้องกรอก ชื่ออังกฤษ และต้องกรอกเป็นภาษาอังกฤษเท่านั้น'),
  company_type: yup.string().notRequired().nullable(),
  website: yup.string(),
  about_us: yup.string().notRequired().nullable(),
  description: yup.string().notRequired().nullable(),
  e_mail_manager: yup.string(),
  e_mail_coordinator: yup.string(),
  tel_no: yup.string().notRequired().nullable().max(10),
  phone_no: yup.string().notRequired().nullable().max(10),
  address_one: yup.string(),
  address_two: yup.string(),
  lane: yup.string(),
  road: yup.string(),
  sub_district: yup.string(),
  district: yup.string(),
  province: yup.string(),
  postal_code: yup.string().notRequired().nullable().max(5),
  start_business_day: yup.string().notRequired().nullable(),
  start_business_time: yup.string().notRequired().nullable(),
  end_business_day: yup.string().notRequired().nullable(),
  end_business_time: yup.string().notRequired().nullable(),
  mou_type: yup.string(),
  mou_link: yup.string(),
  start_date_mou: yup.string(),
  end_date_mou: yup.string()
})
