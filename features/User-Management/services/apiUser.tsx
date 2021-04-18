import api from '../../../utils/api'

const apiUser = {
  getUsersByAdmin: async () => {
    const response = await api.get('admin/users')
    return response
  },
  getUsersByCompany: async () => {
    const response = await api.get('company/users')
    return response
  },
  getRoles: async () => {
    const response = await api.get('roles')
    return response
  },
  createUser: async (data) => {
    const response = await api.post('user', data)
    return response
  },
  createUserByManger: async (data) => {
    const response = await api.post('company/user', data)
    return response
  }
}

export default apiUser
