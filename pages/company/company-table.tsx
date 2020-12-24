import CompanyTable from '../../features/Company/pages/company-table'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'

const CompanyInfo = () => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar />
        <div className="flex justify-center mt-16 ">
          <CompanyTable />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CompanyInfo
