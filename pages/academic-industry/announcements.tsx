import AnnouncementSearch from '../../features/Academic-Industry/pages/announcement-search'
import Footer from '../../core/components/Footer'
import Navbar from '../../core/components/Navbar'
import React from 'react'

const Announcements = () => {
  return (
    <>
      <div className="h-auto bg-white bg-cover">
        <Navbar />
        <div>
          <AnnouncementSearch />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Announcements
