import { makeAutoObservable } from 'mobx'
import { apiAuth } from '../services/apiAuth'
import { createContext } from 'react'
import Cookies from 'js-cookie'
import { Router } from 'next/router'
import axios from 'axios'

export class authContext {
  user
  permission
  token
  isLoggedIn
  roleUser
  verify

  constructor() {
    this.user = ''
    this.permission = ''
    this.token = ''
    this.roleUser = ''
    this.isLoggedIn = false
    this.verify = false

    makeAutoObservable(this)
  }

  login = async (data) => {
    try {
      const response = await apiAuth.login(data)
      if (response?.status === 200) {
        Cookies.set('token', response.data.token)
        this.isLoggedIn = true
        this.permission = response.data.permissions
        this.roleUser = response.data.user.role_name
        Router.prototype.push('/')
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert(error.response?.data?.message)
      } else {
        alert(`เกิดข้อผิดพลาด status code ${error.response?.status}`)
      }
      this.isLoggedIn = false
    }
  }

  fetchMe = async () => {
    try {
      if (Cookies.get('token')) {
        const response = await apiAuth.me()
        if (response?.status === 200) {
          this.isLoggedIn = true
          this.permission = response.data.permissions
          this.roleUser = response.data.user.role_name
        }
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาด status code ${error.response?.status}`)
      this.isLoggedIn = false
    }
  }

  logout = () => {
    this.isLoggedIn = false
    Cookies.remove('token')
    Cookies.remove('permission')
    Router.prototype.push('/')
  }

  SITLogin = async (code, state) => {
    try {
      if (code && state) {
        const response = await apiAuth.SITLogin(code, state)
        if (response?.status === 200) {
          Cookies.set('token', response.data.token)
          this.permission = response.data.permissions
          this.roleUser = response.data.user.role_name
          this.isLoggedIn = true
          Router.prototype.push('/')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  verifyEmail = async (link) => {
    try {
      await axios.get(link).then((data) => {
        if (data.status === 204 || data?.status === 400) {
          this.verify = false
        } else {
          Cookies.set('token', data.data.token)
          this.verify = true
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  setPassword = async (items) => {
    try {
      await apiAuth.setPassword(items).then((data) => {
        if (data.status === 200) {
          Router.prototype.push('/login')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const AuthContext = createContext(new authContext())
