import CompanyDetail from 'features/Company/pages/company-detail'
import { MainLayout } from 'core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'

const CompanyInfo = ({ company_id, authContext }) => {
  const router = useRouter()
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(
        authContext.isLoggedIn,
        ['admin', 'student', 'manager', 'coordinator', 'viewer'],
        authContext.roleUser
      )
      path && router.push(path)
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div className="flex justify-center my-16">
        <CompanyDetail companyId={company_id} />
      </div>
    </MainLayout>
  )
}

CompanyInfo.getInitialProps = (context) => {
  const companyId = context.query.company_id

  return {
    company_id: companyId
  }
}

export default CompanyInfo
