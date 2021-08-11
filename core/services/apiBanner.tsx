import api from '../../utils/api'

export const apiBanner = {
  getBanners: async () => {
    const response = await api.get('/banners')
    return response
  },
  getBannerById: async (id) => {
    const response = await api.get(`/banner/${id}`)
    return response
  },
  uploadBanner: async (data) => {
    const formData = new FormData()
    formData.append('file_banner', data['file_banner'][0])
    formData.append('path_image', data.path_image)
    formData.append('date_display_start', data.date_display_start)
    formData.append('date_display_end', data.date_display_end)

    const response = await api.post('/banner', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
    return response
  },
  updateBanner: async (data) => {
    const response = await api.put('banner', {
      banner_id: data.banner_id,
      date_display_start: data.date_display_start,
      date_display_end: data.date_display_end
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
