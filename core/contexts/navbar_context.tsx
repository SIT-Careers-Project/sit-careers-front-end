import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'

export class NavbarContext {
  anchorEl

  constructor() {
    makeAutoObservable(this)

    this.anchorEl = null
  }

  handleClick = (event) => {
    this.anchorEl = event.currentTarget
  }

  handleClose = () => {
    this.anchorEl = null
  }
}

export const navbarContext = createContext(new NavbarContext())
