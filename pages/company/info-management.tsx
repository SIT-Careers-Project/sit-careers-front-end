import CompanyPage from '../../features/Company/pages/company-info'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'

const CompanyInfo = ({ authContext }) => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar authContext={authContext} />
        <div className="flex justify-center mt-16 ">
          <CompanyPage />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CompanyInfo
