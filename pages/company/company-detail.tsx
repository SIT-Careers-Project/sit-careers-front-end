import CompanyDetail from '../../features/Company/pages/company-detail'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'

const CompanyInfo = () => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar />
        <div className="flex justify-center mt-16 ">
          <CompanyDetail />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CompanyInfo
