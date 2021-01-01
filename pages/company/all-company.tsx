import CompanyPage from '../../features/Company/pages/company-search'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'
const Companies = () => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar />
        <div>
          <CompanyPage />
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Companies
