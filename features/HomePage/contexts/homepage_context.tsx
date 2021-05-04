import { makeAutoObservable } from 'mobx'

import apiService from '../services/apiHomePage'
import { createContext } from 'react'

export class HomePageContext {
  statInfo

  constructor() {
    makeAutoObservable(this)
    this.statInfo = []
  }

  getStat = async () => {
    try {
      const response = await apiService.getStat()
      this.statInfo = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const homePageContext = createContext(new HomePageContext())
