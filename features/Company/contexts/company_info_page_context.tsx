import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyInfoPageContext {
  companies

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      companies: observable
    })
    this.companies = []
  }

  getCompanies = async () => {
    try {
      const response = await apiService.getAllCompanies()
      this.companies = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyInfoPageContext = createContext(new CompanyInfoPageContext())
