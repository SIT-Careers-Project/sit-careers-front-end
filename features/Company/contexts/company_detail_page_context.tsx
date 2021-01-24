import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyDetailPageContext {
  company

  constructor() {
    makeObservable(this, {
      getCompany: action,
      company: observable
    })
    this.company = []
  }

  getCompany = async (companyId) => {
    try {
      const response = await apiService.getCompanyById(companyId)
      this.company = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyDetailPageContext = createContext(new CompanyDetailPageContext())
