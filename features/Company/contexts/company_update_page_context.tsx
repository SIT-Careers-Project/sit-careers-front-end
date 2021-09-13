import { makeAutoObservable } from 'mobx'

import Router from 'next/router'
import apiService from '../services/apiCompany'
import { createContext } from 'react'

export class CompanyUpdatePageContext {
  showModal
  company
  modal
  modalDelete
  alert
  disableButton
  isLoading

  constructor() {
    this.company = []
    this.modalDelete = false
    this.alert = ''
    this.disableButton = false
    this.isLoading = false

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getCompany = async (company_id) => {
    this.company = []
    this.isLoading = true
    try {
      const response = await apiService.getCompanyById(company_id)
      this.company = response.data
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

  updateCompany = async (data) => {
    try {
      this.disableButton = true
      await apiService.updateCompany(data).then(() => {
        this.disableButton = false
        this.modal.closeModal()
        Router.push('/company/info')
        this.alert.setAlert('แก้ไขข้อมูลสำเร็จ', 'success', 'success', true)
      })
    } catch (error) {
      console.log(error)
      this.disableButton = false
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

  handlerModal = (isDeleteModal, openModal) => {
    openModal()
    this.modalDelete = isDeleteModal
  }

  requestDeleteCompany = async () => {
    try {
      this.disableButton = true
      await apiService.requestDelete().then(() => {
        this.disableButton = false
        this.modal.closeModal()
        Router.push('/company/info')
        this.alert.setAlert('ส่งคำร้องขอลบข้อมูลบริษัทสำเร็จ', 'success', 'success', true)
      })
    } catch (error) {
      console.log(error)
      this.disableButton = false
      if (error.response.status === 401) {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดเนื่องจากคุกกี้หมดอายุ กรุณา login ใหม่',
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          `เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถบันทึกข้อมูลได้ status code ${error.response.status}`,
          'error',
          'error',
          true
        )
      }
    }
  }

  deleteCompany = async (companyId) => {
    try {
      this.disableButton = true
      await apiService.deleteCompany(companyId).then(() => {
        this.disableButton = false
        this.modal.closeModal()
        Router.push('/company/info')
      })
    } catch (error) {
      console.log(error)
      this.disableButton = false
      if (error.response.status === 401) {
        this.alert.setAlert(
          'เกิดข้อผิดพลาดเนื่องจากคุกกี้หมดอายุ กรุณา login ใหม่',
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          `เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถบันทึกข้อมูลได้ status code ${error.response.status}`,
          'error',
          'error',
          true
        )
      }
    }
  }
}

export const companyUpdatePageContext = createContext(new CompanyUpdatePageContext())
