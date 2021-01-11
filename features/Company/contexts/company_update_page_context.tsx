import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyUpdatePageContext {
  showModal
  router
  company

  constructor() {
    makeObservable(this, {
      getCompany: action,
      updateCompany: action,
      handleModal: action,
      showModal: observable,
      router: observable,
      company: observable
    })
    this.showModal = false
    this.company = []
    this.router = false
  }

  handleModal = () => {
    this.showModal = true
  }

  handleCloseModal = () => {
    this.showModal = false
  }

  getCompany = async (company_id) => {
    this.company = []
    try {
      const response = await apiService.getCompanyById(company_id)
      this.company = response.data
    } catch (error) {
      console.log(error)
    }
  }

  updateCompany = async (data) => {
    try {
      await apiService.updateCompany(data).then(() => {
        this.showModal = false
        this.router = true
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyUpdatePageContext = createContext(new CompanyUpdatePageContext())
