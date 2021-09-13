import CompanyPage from '../../../features/Company/pages/company-update'
import { MainLayout } from 'core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'
import { Alert } from 'core/components/Alert'

const UpdateCompany = ({ authContext, company_id }) => {
  const router = useRouter()

  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(
        authContext.isLoggedIn,
        ['admin', 'manager', 'coordinator', 'viewer'],
        authContext.roleUser
      )
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex flex-col items-center mt-16 ">
        <Alert />
        <CompanyPage authContext={authContext} companyId={company_id} />
      </div>
    </MainLayout>
  )
}

UpdateCompany.getInitialProps = (context) => {
  const companyId = context.query.company_id

  return {
    company_id: companyId
  }
}

export default UpdateCompany
