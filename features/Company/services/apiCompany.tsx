import api from '../../../utils/api'

const apiCompany = {
  getCompanyById: async (company_id) => {
    const response = await api.get(`/company?company_id=${company_id}`)
    return response
  },
  getAllCompanies: async () => {
    const response = await api.get('/companies')
    return response
  },
  createCompany: async (data) => {
    const formData = new FormData()
    formData.append('company_logo_image', data['company_logo_image'][0])
    formData.append('company_name_th', data.company_name_th)
    formData.append('company_name_en', data.company_name_en)
    formData.append('company_type', data.company_type)
    formData.append('description', data.description)
    formData.append('about_us', data.about_us)
    formData.append('start_business_day', data.start_business_day)
    formData.append('end_business_day', data.end_business_day)
    formData.append('start_business_time', data.start_business_time)
    formData.append('end_business_time', data.end_business_time)
    formData.append('e_mail_coordinator', data.e_mail_coordinator)
    formData.append('e_mail_manager', data.e_mail_manager)
    formData.append('address_one', data.address_one)
    formData.append('address_two', data.address_two)
    formData.append('lane', data.lane)
    formData.append('road', data.road)
    formData.append('sub_district', data.sub_district)
    formData.append('district', data.district)
    formData.append('province', data.province)
    formData.append('postal_code', data.postal_code)
    formData.append('mou_link', data.mou_link)
    formData.append('mou_type', data.mou_type)
    formData.append('contact_period', data.contact_period)
    formData.append('phone_no', data.phone_no)
    formData.append('tel_no', data.tel_no)
    formData.append('logo', data.logo)
    formData.append('website', data.website)
    const response = await api.post('/company', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  updateCompany: async (data) => {
    const formData = new FormData()
    formData.append('company_logo_image', data['company_logo_image'][0])
    formData.append('company_id', data.company_id)
    formData.append('company_name_th', data.company_name_th)
    formData.append('company_name_en', data.company_name_en)
    formData.append('company_type', data.company_type)
    formData.append('description', data.description)
    formData.append('about_us', data.about_us)
    formData.append('start_business_day', data.start_business_day)
    formData.append('end_business_day', data.end_business_day)
    formData.append('start_business_time', data.start_business_time)
    formData.append('end_business_time', data.end_business_time)
    formData.append('e_mail_coordinator', data.e_mail_coordinator)
    formData.append('e_mail_manager', data.e_mail_manager)
    formData.append('address_one', data.address_one)
    formData.append('address_two', data.address_two)
    formData.append('lane', data.lane)
    formData.append('road', data.road)
    formData.append('sub_district', data.sub_district)
    formData.append('district', data.district)
    formData.append('province', data.province)
    formData.append('postal_code', data.postal_code)
    formData.append('mou_link', data.mou_link)
    formData.append('mou_type', data.mou_type)
    formData.append('contact_period', data.contact_period)
    formData.append('phone_no', data.phone_no)
    formData.append('tel_no', data.tel_no)
    formData.append('logo', data.logo)
    formData.append('website', data.website)
    formData.append('_method', 'put')

    const response = await api.post('/company', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  }
}

export default apiCompany
