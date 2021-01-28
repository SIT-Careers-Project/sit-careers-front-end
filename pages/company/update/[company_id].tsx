import CompanyPage from '../../../features/Company/pages/company-update'
import { MainLayout } from '../../../core/components/Layout/Main'
import React from 'react'

const UpdateCompany = () => {
  return (
    <MainLayout>
      <div className="flex justify-center mt-16 ">
        <CompanyPage />
      </div>
    </MainLayout>
  )
}

export default UpdateCompany
