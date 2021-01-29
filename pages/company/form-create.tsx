import CompanyForm from '../../features/Company/pages/company-form'
import { MainLayout } from '../../core/components/Layout/Main'
import React from 'react'

const CompanyInfo = () => {
  return (
    <MainLayout>
      <div className="flex justify-center mt-16">
        <CompanyForm />
      </div>
    </MainLayout>
  )
}

export default CompanyInfo
