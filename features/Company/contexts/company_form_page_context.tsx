import { action, makeObservable, observable } from 'mobx'

import Router from 'next/router'
import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyFormPageContext {
  companies
  formCompany
  modal

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      createCompany: action,
      formCompany: observable
    })
  }

  keyChange = (key, value) => {
    this[key] = value
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
        this.modal.closeModal()
        Router.push('/company/company-table')
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyFormPageContext = createContext(new CompanyFormPageContext())
