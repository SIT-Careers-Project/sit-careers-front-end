import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'

type icon = 'warning' | 'info' | 'error' | 'success'

export class alertContext {
  isOpen
  isClose
  type
  message
  icon: icon
  alert

  constructor() {
    this.isOpen = false
    this.isClose = true
    this.message = ''
    this.type = ''
    this.alert = []
    this.icon = 'success'

    makeAutoObservable(this)
  }

  setAlert = (message, type, icon, isOpen) => {
    this.alert = [
      ...this.alert,
      {
        message: message,
        type: type,
        icon: icon,
        isOpen: isOpen
      }
    ]
  }

  clearAlert = () => {
    this.alert = []
  }

  openAlert = () => {
    this.isOpen = true
  }

  closeAlert = () => {
    this.isClose = true
    this.isOpen = false
  }
}

export const AlertContext = createContext(new alertContext())
