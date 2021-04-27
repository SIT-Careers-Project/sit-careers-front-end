import { action, makeObservable, observable } from 'mobx'

import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyTablePageContext {
  companies
  alert

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      companies: observable
    })
  }

  changeKey = (key, value) => {
    this[key] = value
  }

  getCompaniesByAdmin = async () => {
    try {
      const response = await apiService.getAllCompaniesByAdmin()
      this.companies = response.data
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดึงข้อมูลได้',
        'error',
        'error',
        true
      )
    }
  }

  getCompaniesByCompany = async () => {
    try {
      const response = await apiService.getAllCompaniesByCompany()
      this.companies = response.data
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดึงข้อมูลได้',
        'error',
        'error',
        true
      )
    }
  }

  getCompanies = async () => {
    try {
      const response = await apiService.getAllCompanies()
      this.companies = response.data
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดึงข้อมูลได้',
        'error',
        'error',
        true
      )
    }
  }
}

export const companyTablePageContext = createContext(new CompanyTablePageContext())
