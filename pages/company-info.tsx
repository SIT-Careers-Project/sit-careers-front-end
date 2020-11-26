import CompanyPage from '../features/CompanyPage/component/index'
import Footer from '../core/components/Footer'
import Navbar from '../core/components/Navbar'
import React from 'react'

const CompanyInfo = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <CompanyPage />
      </div>
      <Footer />
    </div>
  )
}

export default CompanyInfo
