import CompanyPage from '../../features/Company/pages/company-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import Router from 'next/router'

const Companies = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      if (!authContext.isLoggedIn) {
        Router.replace('/login')
      }
    })
  }, [authContext])

  return (
    <MainLayout authContext={authContext}>
      <div>
        <CompanyPage />
      </div>
    </MainLayout>
  )
}

export default Companies
