import api from '../../../utils/api'

const apiCompany = {
  getAllCompanies: async () => {
    const response = await api.get('/companies')
    return response
  },
  createCompany: async (data) => {
    const response = await api.post('/company', data)
    return response
  }
}

export default apiCompany
