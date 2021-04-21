import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { createContext } from 'react'
import apiUser from '../services/apiUser'
import apiCompany from '../../Company/services/apiCompany'
import _ from 'lodash'

export class UserInfoPageContext {
  modal
  users
  roles
  userDelete
  disableTrashButton

  selectRoleName
  email
  autoCompleteCompany
  modalDelete

  constructor() {
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
    } catch (error) {
      console.log(error)
    }
  }

  createUserByCompany = async (data) => {
    try {
      await apiUser.createUserByManger(data).then(() => {
        this.getUserByCompany()
        this.modal.closeModal()
      })
    } catch (error) {
      console.log(error)
    }
  }

  getRoles = async () => {
    try {
      const response = await apiUser.getRoles()
      this.roles = response.data
      this.roles = _.remove(this.roles, function (currentObject) {
        return currentObject.role_name !== 'other'
      })
    } catch (error) {
      console.log(error)
    }
  }

  getAutoCompleteCompanies = async () => {
    try {
      await apiCompany.getAllCompanies().then((response) => {
        this.autoCompleteCompany = response.data
      })
    } catch (error) {
      console.log(error)
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
    } catch (error) {
      console.log(error)
    }
  }
}

export const userInfoPageContext = createContext(new UserInfoPageContext())
