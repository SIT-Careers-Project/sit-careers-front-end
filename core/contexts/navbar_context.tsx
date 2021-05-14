import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import { apiNotification } from '../services/apiNotification'
import dayjs from 'dayjs'
import { Router } from 'next/router'

export class NavbarContext {
  anchorEl
  notifications
  showNotification
  isOpenModalBanner

  constructor() {
    makeAutoObservable(this)

    this.anchorEl = null
    this.notifications = []
    this.showNotification = null
    this.isOpenModalBanner = false
  }

  changeKey = (key, value) => {
    this[key] = value
  }

  handleClick = (key, event) => {
    this[key] = event.currentTarget
  }

  handleClose = (key) => {
    this[key] = null
  }

  getNotifications = async () => {
    try {
      const response = await apiNotification.getNotification()
      this.notifications = response.data
    } catch (error) {
      console.log(error)
    }
  }

  updateReadAt = async (item) => {
    try {
      const data = { ...item, read_at: dayjs().locale('th').format('YYYY-MM-DD HH:mm:ss') }
      await apiNotification.updateReadAt(data)
      Router.prototype.push(data.url)
      this.showNotification = null
    } catch (error) {
      console.log()
    }
  }
}

export const navbarContext = createContext(new NavbarContext())
