import CompanyForm from '../features/Company/pages/company-form'
import Footer from '../core/components/Footer'
import Navbar from '../core/components/Navbar'
import React from 'react'

const CompanyInfo = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-16">
        <CompanyForm />
      </div>
      <Footer />
    </div>
  )
}

export default CompanyInfo
