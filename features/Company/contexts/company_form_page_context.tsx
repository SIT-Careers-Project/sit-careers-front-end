import { action, makeObservable, observable } from 'mobx'
import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyFormPageContext {
  companies
  alert
  formCompany
  modal
  modalDisable

  constructor() {
    makeObservable(this, {
      getCompanies: action,
      createCompany: action,
      formCompany: observable,
      alert: observable,
      modalDisable: observable
    })
    this.alert = ''
    this.modalDisable = false
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
      this.alert.setAlert(
        'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดึงข้อมูลได้',
        'error',
        'error',
        true
      )
    }
  }

  createCompany = async (data) => {
    try {
      await apiService.createCompany(data).then(() => {
        this.modalDisable = true
        this.modal.closeModal()
        this.alert.setAlert('บันทึกข้อมูลสำเร็จ', 'success', 'success', true)
        window.scrollTo(0, 0)
      })
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดเนื่องจากคุกกี้หมดอายุ กรุณา login ใหม่',
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถบันทึกข้อมูลได้',
          'error',
          'error',
          true
        )
      }
    }
  }
}

export const companyFormPageContext = createContext(new CompanyFormPageContext())
