import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyFormPageContext {
  companies
  formCompany
  showModal
  router

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      createCompany: action,
      handleModal: action,
      formCompany: observable,
      showModal: observable,
      router: observable
    })
    this.showModal = false
    this.router = false
  }

  handleModal = () => {
    this.showModal = true
  }

  handleCloseModal = () => {
    this.showModal = false
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
      await apiService.createCompany(data).then(() => {
        this.showModal = false
        this.router = true
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyFormPageContext = createContext(new CompanyFormPageContext())
