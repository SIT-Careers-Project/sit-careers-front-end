import api from '../../utils/api'

export const apiBanner = {
  getBanners: async () => {
    const response = await api.get('/banners')
    return response
  },
  uploadBanner: async (data) => {
    const formData = new FormData()
    formData.append('file_banner', data['file_banner'][0])
    formData.append('path_image', data.path_image)

    const response = await api.post('/banner', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  deleteBanner: async (path_image, banner_id) => {
    const data = {
      path_image: path_image,
      banner_id: banner_id.toString()
    }
    const response = await api.delete('/banner', data)
    return response
  }
}
