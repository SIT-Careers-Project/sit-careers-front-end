import CompanyPage from '../features/Company/pages/company-info'
import Footer from '../core/components/Footer'
import Navbar from '../core/components/Navbar'
import React from 'react'

const CompanyInfo = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-16">
        <CompanyPage />
      </div>
      <Footer />
    </div>
  )
}

export default CompanyInfo
