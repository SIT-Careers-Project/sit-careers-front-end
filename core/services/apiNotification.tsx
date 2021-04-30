import api from '../../utils/api'

export const apiNotification = {
  getNotification: async () => {
    const response = await api.get('/notifications')
    return response
  },
  updateReadAt: async (data) => {
    const response = await api.put('/notification', data)
    return response
  }
}
