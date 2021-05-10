import api from '../../../utils/api'

const apiReport = {
  createReport: async (data) => {
    const response = await api.post('/dashboard/report', data, {
      headers: { 'Content-type': 'application/octet-stream' }
    })
    return response
  }
}
export default apiReport
