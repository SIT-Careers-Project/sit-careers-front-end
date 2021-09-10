import { makeAutoObservable } from 'mobx'

import apiService from '../services/apiHomePage'
import { createContext } from 'react'

export class HomePageContext {
  statInfo
  isLoading

  constructor() {
    makeAutoObservable(this)
    this.statInfo = []
    this.isLoading = false
  }

  getStat = async () => {
    try {
      this.isLoading = true
      const response = await apiService.getStat()
      this.statInfo = response.data
      this.isLoading = false
    } catch (error) {
      console.log(error)
    }
  }
}

export const homePageContext = createContext(new HomePageContext())
