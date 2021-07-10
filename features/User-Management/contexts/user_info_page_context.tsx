import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { createContext } from 'react'
import apiUser from '../services/apiUser'
import apiCompany from '../../Company/services/apiCompany'
import _ from 'lodash'

export class UserInfoPageContext {
  modal
  alert

  users
  roles
  userDelete
  disableTrashButton

  selectRoleName
  email
  autoCompleteCompany
  modalDelete

  constructor() {
    this.alert = ''
    this.modal = ''
    this.modalDelete = false
    this.selectRoleName = ''
    this.email = ''
    this.autoCompleteCompany = []
    this.users = []
    this.roles = []
    this.userDelete = []
    this.disableTrashButton = true

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getUserByAdmin = async () => {
    try {
      const response = await apiUser.getUsersByAdmin()
      runInAction(() => {
        this.users = response.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  getUserByCompany = async () => {
    try {
      const response = await apiUser.getUsersByCompany()
      runInAction(() => {
        this.users = response.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  createUserByAdmin = async (data) => {
    try {
      await apiUser.createUser(data).then(() => {
        this.getUserByAdmin()
        this.modal.closeModal()
      })
      this.alert.setAlert('เพิ่มผู้ใช้งานสำเร็จ', 'success', 'success', true)
    } catch (error) {
      let message = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถเพิ่มผู้ประสานงานได้'
      if (error.response.status === 400) {
        message = `ไม่สามารถ เพิ่มผู้ประสานงานได้ เนื่องจากไม่มีชื่อบริษัทที่กรอกในระบบ กรุณากรอกเฉพาะชื่อที่มีให้ระบบเท่านั้นหรือถ้ายังไม่มีกรุณา เพิ่มข้อมูลบริษัท`
      }
      this.alert.setAlert(message, 'error', 'error', true)
      this.modal.closeModal()
    }
  }

  createUserByCompany = async (data) => {
    try {
      await apiUser.createUserByManger(data).then(() => {
        this.getUserByCompany()
        this.modal.closeModal()
      })
      this.alert.setAlert('เพิ่มผู้ใช้งานสำเร็จ', 'success', 'success', true)
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถเพิ่มผู้ประสานงานได้',
        'error',
        'error',
        true
      )
      this.modal.closeModal()
    }
  }

  getRoles = async () => {
    try {
      const response = await apiUser.getRoles()
      this.roles = response.data
      this.roles = _.filter(this.roles, function (currentObject) {
        return (
          currentObject.role_name !== 'other' &&
          currentObject.role_name != 'student' &&
          currentObject.role_name != 'admin'
        )
      })
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

  getAutoCompleteCompanies = async () => {
    try {
      await apiCompany.getAllCompanies().then((response) => {
        this.autoCompleteCompany = response.data
      })
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

  onDeleteUserByAdmin = async () => {
    try {
      const item = { data: toJS(this.userDelete) }
      await apiUser.deleteUserByAdmin(item).then(async () => {
        const response = await apiUser.getUsersByAdmin()
        this.users = response.data
        this.modal.closeModal()
      })
      this.alert.setAlert('ลบผู้ใช้สำเร็จ', 'success', 'info', true)
      this.disableTrashButton = true
    } catch (error) {
      console.log(error)
      this.alert.setAlert(
        'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่ลบผู้ประสานงานได้',
        'error',
        'error',
        true
      )
    }
  }
}

export const userInfoPageContext = createContext(new UserInfoPageContext())
