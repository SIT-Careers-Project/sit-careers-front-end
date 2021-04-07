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
    formData.append('address_one', data.address_one)
    formData.append('address_two', data.address_two)
    formData.append('company_id', data.company_id)
    formData.append('priority', data.priority ? data.priority : '-')
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
    formData.append('file_picture', data['file_picture'][0] ? data['file_picture'][0] : '')
    formData.append('picture', data.picture ? data.picture : '-')
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
  },
  getJosPositions: async () => {
    const response = await api.get('/academic-industry/job-positions')
    return response
  },
  updateAnnouncement: async (data) => {
    const formData = new FormData()
    formData.append('address_one', data.address_one)
    formData.append('address_two', data.address_two)
    formData.append('address_id', data.address_id)
    formData.append('company_id', data.company_id)
    formData.append('priority', data.priority)
    formData.append('lane', data.lane)
    formData.append('road', data.road)
    formData.append('sub_district', data.sub_district)
    formData.append('district', data.district)
    formData.append('province', data.province)
    formData.append('postal_code', data.postal_code)
    formData.append('company_id', data.company_id)
    formData.append('announcement_title', data.announcement_title)
    formData.append('announcement_id', data.announcement_id)
    formData.append('job_description', data.job_description)
    formData.append('job_position_id', data.job_position_id)
    formData.append('property', data.property)
    formData.append('file_picture', data['file_picture'][0] ? data['file_picture'][0] : '')
    formData.append('picture', data.picture ? data.picture : '-')
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
    formData.append('_method', 'put')

    const response = await api.post('/academic-industry/announcement', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  getResumeById: async (resume_id) => {
    const response = await api.get(`/academic-industry/resume/?resumes_id=${resume_id}`)
    return response
  },
  getResumeByUserId: async () => {
    const response = await api.get(`/academic-industry/resume`)
    return response
  },
  getResumes: async () => {
    const response = await api.get('/academic-industry/resumes')
    return response
  },
  getAllAnnouncementResumes: async () => {
    const response = await api.get('/academic-industry/applications')
    return response
  },
  getAnnouncementResumeByAdmin: async () => {
    const response = await api.get(`academic-industry/admin/applications `)
    return response
  },
  CreateAnnouncementResume: async (data) => {
    const formData = new FormData()
    formData.append('announcement_id', data.announcement_id)
    formData.append('note', data.note ? data.note : '-')
    formData.append('resume_id', data.resume_id)
    formData.append('status', data.status)

    const response = await api.post('/academic-industry/application', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  updateAnnouncementResume: async (data) => {
    const formData = new FormData()
    formData.append('announcement_resume_id', data.announcement_resume_id)
    formData.append('note', data.note ? data.note : '-')
    formData.append('status', data.status ? data.status : '-')
    formData.append('_method', 'put')

    const response = await api.post('/academic-industry/application', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  }
}

export default apiAcademic
