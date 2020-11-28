import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyFormPageContext {
  companies
  formCompany

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      createCompany: action,
      formCompany: observable
    })
  }

  getCompanies = async () => {
    try {
      const response = await apiService.getAllCompanies()
      this.companies = response
    } catch (error) {
      console.log(error)
    }
  }

  createCompany = async (data) => {
    try {
      const response = await apiService.createCompany(data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyFormPageContext = createContext(new CompanyFormPageContext())
