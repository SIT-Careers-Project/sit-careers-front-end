import { makeAutoObservable } from 'mobx'

import { createContext } from 'react'
import apiUser from '../services/apiUser'
import apiCompany from '../../Company/services/apiCompany'
import _ from 'lodash'

export class UserInfoPageContext {
  modal
  users
  roles

  selectRoleName
  email
  autoCompleteCompany

  constructor() {
    this.modal = ''
    this.selectRoleName = ''
    this.email = ''
    this.autoCompleteCompany = []
    this.users = []
    this.roles = []

    makeAutoObservable(this)
  }

  keyChange = (key, value) => {
    this[key] = value
  }

  getUserByAdmin = async () => {
    try {
      const response = await apiUser.getUsersByAdmin()
      this.users = response.data
    } catch (error) {
      console.log(error)
    }
  }

  getUserByCompany = async () => {
    try {
      const response = await apiUser.getUsersByCompany()
      this.users = response.data
    } catch (error) {
      console.log(error)
    }
  }

  createUser = async (data) => {
    try {
      const response = await apiUser.createUser(data)
      console.log(response)
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
}

export const userInfoPageContext = createContext(new UserInfoPageContext())
