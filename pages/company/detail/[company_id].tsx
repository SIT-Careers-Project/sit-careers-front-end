import CompanyDetail from '../../../features/Company/pages/company-detail'
import { MainLayout } from '../../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Router from 'next/router'

const CompanyInfo = ({ query, authContext }) => {
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
      <div className="flex justify-center mt-16">
        <CompanyDetail companyId={query.company_id} />
      </div>
    </MainLayout>
  )
}

CompanyInfo.getInitialProps = ({ query }) => ({ query })
export default CompanyInfo
