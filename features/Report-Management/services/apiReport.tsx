import api from '../../../utils/api'

const apiReport = {
  getCompaniesByFilterDate: async (startDate, endDate) => {
    const response = await api.get(
      `/dashboard/companies/export?start_date=${startDate}&end_date=${endDate}`
    )
    return response
  },
  getAnnouncementsByFilterDate: async (startDate, endDate) => {
    const response = await api.get(
      `/dashboard/announcements/export?start_date=${startDate}&end_date=${endDate}`
    )
    return response
  },
  getDashboardByFilterDate: async (startDate, endDate) => {
    const response = await api.get(
      `/dashboard/dashboard/export?start_date=${startDate}&end_date=${endDate}`
    )
    return response
  }
}
export default apiReport
