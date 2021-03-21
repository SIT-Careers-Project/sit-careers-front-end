import CompanyPage from '../../features/Company/pages/company-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Companies = ({ authContext }) => {
  const router = useRouter()

  useEffect(() => {
    authContext.fetchMe().then(() => {
      if (!authContext.isLoggedIn) {
        router.push('/login')
      }
    })
  }, [authContext, router])

  return (
    <MainLayout authContext={authContext}>
      <div>
        <CompanyPage />
      </div>
    </MainLayout>
  )
}

export default Companies
