import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { apiBanner } from '../services/apiBanner'
import _ from 'lodash'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export class modalBannerContext {
  banners
  banner
  bannerForShow
  banner_id
  file
  index

  constructor() {
    makeAutoObservable(this)

    this.banners = []
    this.banner_id = ''
    this.banner = []
    this.bannerForShow = []
    this.index = 0
    this.file = null
  }

  changeKey = (key, value) => {
    this[key] = value
  }

  getBanners = async () => {
    try {
      const response = await apiBanner.getBanners()
      this.banners = response.data
      this.bannerForShow = _.filter(this.banners, (item) => {
        return dayjs().isBetween(item.date_display_start, item.date_display_end, null, '[]')
      })
    } catch (error) {
      console.log(error)
    }
  }

  getBannerById = async (bannerId) => {
    try {
      const response = await apiBanner.getBannerById(bannerId)
      this.banner = response.data
      this.banner_id = this.banner.banner_id
    } catch (error) {
      console.log(error)
    }
  }

  updateBanner = async (data) => {
    const bannerData = {
      banner_id: this.banner_id,
      ...data
    }
    try {
      const response = await apiBanner.updateBanner(bannerData)
      this.banner = response.data
      this.getBanners()
      this.index = 0
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
      this.index = 0
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
