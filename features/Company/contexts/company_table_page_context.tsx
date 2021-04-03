import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyTablePageContext {
  companies

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      companies: observable
    })
  }

  getCompaniesByAdmin = async () => {
    try {
      const response = await apiService.getAllCompaniesByAdmin()
      this.companies = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getCompaniesByCompany = async () => {
    try {
      const response = await apiService.getAllCompaniesByCompany()
      this.companies = response.data
    } catch (error) {
      console.log(error)
    }
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

export const companyTablePageContext = createContext(new CompanyTablePageContext())
