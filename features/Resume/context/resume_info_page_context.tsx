import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import apiResume from '../services/apiResume'

export class ResumeInfoPageContext {
  modal
  resume
  fileName
  renderDelay
  alert
  isLoading

  constructor() {
    this.modal = ''
    this.resume = ''
    this.fileName = 'No file chosen'
    this.renderDelay = true
    this.isLoading = false
    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getResumeById = async (resumeId) => {
    try {
      const response = await apiResume.getResumeById(resumeId)
      this.resume = response.data
      this.fileName = 'No file chosen'
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
          'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดีงข้อมูลได้',
          'error',
          'error',
          true
        )
      }
    }
  }

  getResumeByUserId = async () => {
    try {
      const response = await apiResume.getResumeByUserId()
      this.resume = response.data[0]
      this.fileName = 'No file chosen'
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
          'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถดีงข้อมูลได้',
          'error',
          'error',
          true
        )
      }
    }
  }

  updateResume = async (data) => {
    try {
      await apiResume.updateResume(data).then((response) => {
        this.fileName = 'No file chosen'
        this.modal.closeModal()
        if (response?.status === 200) {
          this.alert.setAlert(`สร้างโปรไฟล์สำเร็จ !`, 'success', 'success', true)
          window.scrollTo(0, 0)
        } else if (response?.status === 400) {
          this.alert.setAlert(`กรุณากรอกข้อมูลให้ถูกต้อง !`, 'warning', 'warning', true)
          window.scrollTo(0, 0)
        }
      })
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        this.alert.setAlert(
          `ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากคุณไม่ได้กรอกข้อมูลบางอย่าง กรุณาตรวจสอบข้อมูล`,
          'error',
          'error',
          true
        )
      } else {
        this.alert.setAlert(
          `ไม่สามารถแก้ไขข้อมูลได้ เนื่องจาก ${error.response?.data?.message}`,
          'error',
          'error',
          true
        )
      }
    }
  }

  createResume = async (data) => {
    try {
      await apiResume.createResume(data).then((response) => {
        this.fileName = 'No file chosen'
        this.modal.closeModal()
        if (response?.status === 200) {
          this.alert.setAlert(`สร้างโปรไฟล์สำเร็จ !`, 'success', 'success', true)
          window.scrollTo(0, 0)
        } else if (response?.status === 400) {
          this.alert.setAlert(`กรุณากรอกข้อมูลให้ถูกต้อง !`, 'warning', 'warning', true)
          window.scrollTo(0, 0)
        }
      })
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        `ไม่สามารถบันทึกข้อมูลได้ เนื่องจาก ${error.response?.data?.message}`,
        'error',
        'error',
        true
      )
    }
  }
}
export const resumeInfoPageContext = createContext(new ResumeInfoPageContext())
