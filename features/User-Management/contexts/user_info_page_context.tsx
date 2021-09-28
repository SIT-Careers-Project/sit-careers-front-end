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
  roleViewer
  roleSelected
  userDelete
  disableTrashButton

  selectRoleName
  autoCompleteCompany
  modalDelete
  isLoading

  constructor() {
    this.alert = ''
    this.modal = ''
    this.modalDelete = false
    this.selectRoleName = ''
    this.autoCompleteCompany = []
    this.users = []
    this.roles = []
    this.userDelete = []
    this.disableTrashButton = true
    this.roleViewer = ''
    this.roleSelected = ''
    this.isLoading = false

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
      this.isLoading = true
      await apiUser.createUser(data).then(() => {
        this.getUserByAdmin()
        this.modal.closeModal()
        this.isLoading = false
      })
      this.alert.setAlert('เพิ่มผู้ใช้งานสำเร็จ', 'success', 'success', true)
    } catch (error) {
      let message = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถเพิ่มผู้ประสานงานได้'
      if (error.response.status === 400) {
        if (error.response.data.email) {
          message = `ไม่สามารถ เพิ่มผู้ประสานงานได้ เนื่องจาก email นี้ได้ถูกใช้งานในระบบไปแล้ว`
        } else if (error.response.data.company_id) {
          message = `ไม่สามารถ เพิ่มผู้ประสานงานได้ เนื่องจากไม่มีบริษัทที่อยู่ในระบบ`
        }
      }
      this.alert.setAlert(message, 'error', 'error', true)
      this.modal.closeModal()
      this.isLoading = false
    }
  }

  createUserByCompany = async (data) => {
    try {
      this.isLoading = true
      await apiUser.createUserByManger(data).then(() => {
        this.getUserByCompany()
        this.modal.closeModal()
      })
      this.isLoading = false
      this.alert.setAlert('เพิ่มผู้ใช้งานสำเร็จ', 'success', 'success', true)
    } catch (error) {
      console.log(error)
      let message = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ ไม่สามารถเพิ่มผู้ประสานงานได้'
      if (error.response.status === 400) {
        message = `ไม่สามารถ เพิ่มผู้ประสานงานได้ เนื่องจากคุณเพิ่มผู้ประสานงานครบจำนวนแล้ว`
      }
      this.alert.setAlert(message, 'error', 'error', true)
      this.modal.closeModal()
      this.isLoading = false
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
      this.roleViewer = _.find(this.roles, (value) => value.role_name === 'viewer')
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
