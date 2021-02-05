import api from '../../../utils/api'

const apiAcademic = {
  getAnnouncementById: async (announcement_id) => {
    const response = await api.get(
      `/academic-industry/announcement?announcement_id=${announcement_id}`
    )
    return response
  },
  getAllAnnouncement: async () => {
    const response = await api.get('/academic-industry/announcements')
    return response
  },
  createAnnouncement: async (data) => {
    const formData = new FormData()
    console.log(data)
    formData.append('address_one', data.address_one)
    formData.append('address_two', data.address_two)
    formData.append('lane', data.lane)
    formData.append('road', data.road)
    formData.append('sub_district', data.sub_district)
    formData.append('district', data.district)
    formData.append('province', data.province)
    formData.append('postal_code', data.postal_code)
    formData.append('company_id', data.company_id)
    formData.append('announcement_title', data.announcement_title)
    formData.append('job_description', data.job_description)
    formData.append('job_position_id', data.job_position_id)
    formData.append('property', data.property)
    formData.append('picture', data.picture)
    formData.append('start_date', data.start_date)
    formData.append('end_date', data.end_date)
    formData.append('salary', data.salary)
    formData.append('welfare', data.welfare)
    formData.append('status', data.status)
    formData.append('start_business_day', data.start_business_day)
    formData.append('end_business_day', data.end_business_day)
    formData.append('start_business_time', data.start_business_time)
    formData.append('end_business_time', data.end_business_time)
    formData.append('job_type', data.job_type)

    const response = await api.post('/academic-industry/announcement', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  }
}

export default apiAcademic
