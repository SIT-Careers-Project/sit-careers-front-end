import axios from 'axios'
import Cookie from 'js-cookie'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const apiReport = {
  createReport: async (data) => {
    const response = axios.post(`${publicRuntimeConfig.API_URL}/dashboard/report`, data, {
      headers: {
        Authorization: `Bearer ${Cookie.get('token')}`,
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    })
    return response
  }
}
export default apiReport
