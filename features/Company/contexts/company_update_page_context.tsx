import { action, makeObservable, observable } from 'mobx'

import Router from 'next/router'
import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyUpdatePageContext {
  showModal
  company
  modal

  constructor() {
    makeObservable(this, {
      getCompany: action,
      updateCompany: action,
      showModal: observable,
      company: observable
    })
    this.company = []
  }

  keyChange = (key, value) => {
    this[key] = value
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
        this.modal.closeModal()
        Router.push('/company/company-table')
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyUpdatePageContext = createContext(new CompanyUpdatePageContext())
