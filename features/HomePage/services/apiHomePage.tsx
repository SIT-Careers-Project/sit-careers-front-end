import api from '../../../utils/api'

const apiHomePage = {
  getStat: async () => {
    const response = await api.get('/dashboard/stats')
    return response
  }
}

export default apiHomePage
