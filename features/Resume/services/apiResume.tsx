import api from '../../../utils/api'

const apiResume = {
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
  createResume: async (data) => {
    const formData = new FormData()
    formData.append('name_title', data.name_title)
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('email', data.email)
    formData.append('curriculum', data.curriculum)
    formData.append('year', data.year)
    formData.append('tel_no', data.tel_no)
    formData.append('resume_link', data.resume_link)
    formData.append('path_file', data.path_file ? data.path_file : '-')
    const response = await api.post('/academic-industry/resume', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  updateResume: async (data) => {
    const formData = new FormData()
    formData.append('resume_id', data.resume_id)
    formData.append('name_title', data.name_title)
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('email', data.email)
    formData.append('curriculum', data.curriculum)
    formData.append('year', data.year)
    formData.append('tel_no', data.tel_no)
    formData.append('resume_link', data.resume_link)
    formData.append('path_file', data.path_file ? data.path_file : '-')
    formData.append('_method', 'put')
    const response = await api.post('/academic-industry/resume', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  deleteResumeById: async (resume_id) => {
    const response = await api.put(`/academic-industry/resume/?resumes_id=${resume_id}`)
    return response
  }
}

export default apiResume
