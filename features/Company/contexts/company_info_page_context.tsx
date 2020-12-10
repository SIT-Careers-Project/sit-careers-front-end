import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyInfoPageContext {
  companies
  beforeSearch

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      setCompanies: action,
      companies: observable,
      beforeSearch: observable
    })
    this.companies = []
    this.beforeSearch = []
  }

  setCompanies = (companies) => {
    this.companies = companies
  }

  getCompanies = async () => {
    try {
      const response = await apiService.getAllCompanies()
      this.companies = response.data
      this.beforeSearch = response.data
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyInfoPageContext = createContext(new CompanyInfoPageContext())
