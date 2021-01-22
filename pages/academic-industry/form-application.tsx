import ApplicationForm from '../../features/Academic-Industry/pages/announcement-application'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'

const Announcements = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex justify-center mt-16">
          <ApplicationForm />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Announcements
