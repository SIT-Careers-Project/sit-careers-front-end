import CompanyPage from '../../../features/Company/pages/company-update'
import { MainLayout } from '../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Router from 'next/router'

const UpdateCompany = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const checkRole = _.includes(['admin', 'manager', 'coordinator'], authContext.roleUser)
      if (authContext.isLoggedIn) {
        if (!checkRole) {
          Router.replace('/401')
        }
      } else {
        Router.replace('/login')
      }
    })
  }, [authContext])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center mt-16 ">
        <CompanyPage />
      </div>
    </MainLayout>
  )
}

export default UpdateCompany
