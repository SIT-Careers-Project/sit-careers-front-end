import { action, makeObservable, observable } from 'mobx'
import apiService from '../services/apiCompany'
import { createContext } from 'react'
export class CompanySearchPageContext {
  companies
  beforeSearch
  companyName
  companyType
  isLoading

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      setCompanies: action,
      companies: observable,
      beforeSearch: observable,
      companyName: observable,
      companyType: observable
    })
    this.companies = []
    this.beforeSearch = []
    this.companyName = ''
    this.companyType = []
    this.isLoading = false
  }

  setValue = (key, value) => {
    this[key] = value
  }

  setCompanies = (companies) => {
    this.companies = companies
  }

  getCompanies = async () => {
    try {
      this.isLoading = true
      const response = await apiService.getAllCompanies()
      this.companies = response.data
      this.beforeSearch = response.data
      this.isLoading = false
    } catch (error) {
      console.log(error)
    }
  }
}
export const companySearchPageContext = createContext(new CompanySearchPageContext())
