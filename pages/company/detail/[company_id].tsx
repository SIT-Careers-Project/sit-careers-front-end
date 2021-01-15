import CompanyDetail from '../../../features/Company/pages/company-detail'
import Footer from '../../../core/components/Footer'
import Navbar from '../../../core/components/Navbar'
import React from 'react'

const CompanyInfo = ({ query }) => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar />
        <div className="flex justify-center mt-16 ">
          <CompanyDetail companyId={query.company_id} />
        </div>
      </div>
      <Footer />
    </>
  )
}

CompanyInfo.getInitialProps = ({ query }) => ({ query })
export default CompanyInfo
