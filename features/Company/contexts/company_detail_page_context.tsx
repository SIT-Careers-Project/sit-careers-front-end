import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyDetailPageContext {
  company
  announcements

  constructor() {
    makeObservable(this, {
      getCompany: action,
      getAnnouncements: action,
      company: observable,
      announcements: observable
    })
    this.company = []
    this.announcements = []
  }

  getCompany = async (companyId) => {
    try {
      const response = await apiService.getCompanyById(companyId)
      this.company = response.data
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
