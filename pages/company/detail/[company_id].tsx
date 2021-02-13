import CompanyDetail from '../../../features/Company/pages/company-detail'
import { MainLayout } from '../../../core/components/Layout/Main'
import React from 'react'

const CompanyInfo = ({ query }) => {
  return (
    <MainLayout>
      <div className="flex justify-center mt-16">
        <CompanyDetail companyId={query.company_id} />
      </div>
    </MainLayout>
  )
}

CompanyInfo.getInitialProps = ({ query }) => ({ query })
export default CompanyInfo
