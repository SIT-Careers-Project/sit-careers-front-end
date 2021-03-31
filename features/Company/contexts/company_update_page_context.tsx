import { makeAutoObservable } from 'mobx'

import Router from 'next/router'
import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyUpdatePageContext {
  showModal
  company
  modal
  modalDelete

  constructor() {
    this.company = []
    this.modalDelete = false

    makeAutoObservable(this)
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

  handlerModal = (isDeleteModal, openModal) => {
    openModal()
    this.modalDelete = isDeleteModal
  }

  requestDeleteCompany = async () => {
    try {
      await apiService.requestDelete().then(() => {
        this.modal.closeModal()
        Router.push('/company/company-table')
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteCompany = async (companyId) => {
    try {
      await apiService.deleteCompany(companyId).then(() => {
        this.modal.closeModal()
        Router.push('/company/company-table')
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const companyUpdatePageContext = createContext(new CompanyUpdatePageContext())
