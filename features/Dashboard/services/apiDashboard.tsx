import api from '../../../utils/api'

const apiDashboard = {
  getCompanyTypes: async () => {
    const response = await api.get('/dashboard/company-types')
    return response
  },
  getStudentJobPositions: async () => {
    const response = await api.get('/dashboard/students/job-positions')
    return response
  },
  getAnnouncementJobPositions: async () => {
    const response = await api.get('/dashboard/announcements/job-positions')
    return response
  },
  getStat: async () => {
    const response = await api.get('/dashboard/stats')
    return response
  }
}

export default apiDashboard
