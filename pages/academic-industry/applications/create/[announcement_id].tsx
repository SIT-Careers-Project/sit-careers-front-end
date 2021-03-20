import ApplicationForm from '../../../../features/Academic-Industry/pages/announcement-application'
import Footer from '../../../../core/components/Footer'
import Navbar from '../../../../core/components/Navbar'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { checkLoggedIn } from 'core/services/utils'

const CreateApplication = ({ authContext }) => {
  const router = useRouter()
  useEffect(() => {
    authContext.fetchMe().then(() => {
      const path = checkLoggedIn(authContext.isLoggedIn, ['admin', 'student'], authContext.roleUser)
      router.push(path)
    })
  }, [authContext, router])

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
