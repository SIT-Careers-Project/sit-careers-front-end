import api from '../../utils/api'

export const apiAuth = {
  login: async (data) => {
    const response = await api.post('/login', data)
    return response
  },
  me: async () => {
    const response = await api.get('/me')
    return response
  }
}
