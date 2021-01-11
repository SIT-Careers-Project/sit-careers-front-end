import CompanyPage from '../../../features/Company/pages/company-update'
import Footer from '../../../core/components/Footer'
import Navbar from '../../../core/components/Navbar'
import React from 'react'

const UpdateCompany = () => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar />
        <div className="flex justify-center mt-16 ">
          <CompanyPage />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default UpdateCompany
