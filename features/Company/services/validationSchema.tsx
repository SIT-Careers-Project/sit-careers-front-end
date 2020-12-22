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
    .matches(/[^a-zA-Z0-9]/)
    .required(),
  company_name_en: yup
    .string()
    .matches(/[a-zA-Z0-9]/)
    .required(),
  company_type: yup.number().required(),
  website: yup.string().required(),
  about_us: yup.string().max(200).required(),
  description: yup.string().max(200).required(),
  e_mail_manager: yup.string().email().required(),
  e_mail_coordinator: yup.string().email().required(),
  tel_no: yup.string().matches(/[0-9]/g).min(10).max(10).required(),
  phone_no: yup.string().matches(/[0-9]/g).min(10).max(10).required(),
  address_one: yup.string().required(),
  address_two: yup.string().required(),
  lane: yup.string().required(),
  road: yup.string().required(),
  sub_district: yup.string().required(),
  district: yup.string().required(),
  province: yup.string().required(),
  postal_code: yup.string().required(),
  start_business_day: yup.string().required(),
  start_business_time: yup.string().required(),
  end_business_day: yup.string().required(),
  end_business_time: yup.string().required(),
  mou_type: yup.string().required(),
  contact_period: yup.string().required(),
  mou_link: yup.string().required()
})
