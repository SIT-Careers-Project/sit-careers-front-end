import CompanyPage from '../../features/Company/pages/company-search'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const Companies = ({ authContext }) => {
  return (
    <MainLayout authContext={authContext}>
      <div>
        <CompanyPage />
      </div>
    </MainLayout>
  )
}
export default Companies
