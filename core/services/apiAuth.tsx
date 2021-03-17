import api from '../../utils/api'

export const apiAuth = {
  login: async (data) => {
    const response = await api.post('/login', data)
    return response
  },
  me: async () => {
    const response = await api.get('/me')
    return response
  },
  SITLogin: async (code, state) => {
    const response = await api.post('/sit-login', {
      state: state,
      code: code
    })
    return response
  }
}
