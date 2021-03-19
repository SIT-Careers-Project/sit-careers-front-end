import ApplicationForm from '../../../../features/Academic-Industry/pages/announcement-application'
import Footer from '../../../../core/components/Footer'
import Navbar from '../../../../core/components/Navbar'
import React, { useEffect } from 'react'
import _ from 'lodash'
import Router from 'next/router'

const CreateApplication = ({ authContext }) => {
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const checkRole = _.includes(['admin', 'student'], authContext.roleUser)
      if (authContext.isLoggedIn) {
        if (!checkRole) {
          Router.replace('/401')
        }
      } else {
        Router.replace('/login')
      }
    })
  }, [authContext])

  return (
    <>
      <div>
        <Navbar authContext={authContext} />
        <div className="flex justify-center mt-16">
          <ApplicationForm />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default CreateApplication
