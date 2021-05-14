import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { apiBanner } from '../services/apiBanner'

export class modalBannerContext {
  banners
  file

  constructor() {
    makeAutoObservable(this)

    this.banners = []
    this.file = null
  }

  changeKey = (key, value) => {
    this[key] = value
  }

  getBanners = async () => {
    try {
      const response = await apiBanner.getBanners()
      this.banners = response.data
    } catch (error) {
      console.log(error)
    }
  }

  uploadBanner = async (data) => {
    try {
      await apiBanner.uploadBanner(data)
      this.getBanners()
      setTimeout(() => {
        this.file = null
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  deleteBanner = async (path_image, banner_id) => {
    try {
      await apiBanner.deleteBanner(path_image, banner_id)
      this.getBanners()
    } catch (error) {
      console.log(error)
    }
  }
}

export const ModalBannerContext = createContext(new modalBannerContext())
