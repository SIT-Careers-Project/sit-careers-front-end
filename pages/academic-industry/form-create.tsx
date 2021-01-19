import FormCreate from '../../features/Academic-Industry/pages/announcement-form'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'

const AnnouncementForm = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-16">
        <FormCreate />
      </div>
      <Footer />
    </div>
  )
}

export default AnnouncementForm
