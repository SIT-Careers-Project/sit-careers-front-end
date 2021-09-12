import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyDetailPageContext {
  company
  announcements
  isLoading

  constructor() {
    makeObservable(this, {
      getCompany: action,
      getAnnouncements: action,
      company: observable,
      announcements: observable
    })
    this.company = []
    this.announcements = []
    this.isLoading = false
  }

  getCompany = async (companyId) => {
    try {
      this.isLoading = true
      const response = await apiService.getCompanyById(companyId)
      this.company = response.data
      this.isLoading = false
    } catch (error) {
      console.log(error)
    }
  }

  getAnnouncements = async (companyId) => {
    try {
      const response = await apiService.getAnnouncementByCompanyId(companyId)
      this.announcements = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyDetailPageContext = createContext(new CompanyDetailPageContext())
