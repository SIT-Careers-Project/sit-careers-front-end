import { action, makeObservable, observable } from 'mobx'

import { createContext } from 'react'

export class NavbarContext {
  anchorEl

  constructor() {
    makeObservable(this, {
      handleClose: action,
      handleClick: action,
      anchorEl: observable
    })
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
