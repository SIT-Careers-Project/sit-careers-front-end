import { action, makeObservable, observable } from 'mobx'

import { createContext } from 'react'

export class ModalContext {
  isOpen
  isClose

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      isClose: observable,
      openModal: action,
      closeModal: action
    })
    this.isOpen = false
    this.isClose = true
  }

  openModal = () => {
    this.isOpen = true
  }

  closeModal = () => {
    this.isClose = true
    this.isOpen = false
  }
}

export const modalContext = createContext(new ModalContext())
