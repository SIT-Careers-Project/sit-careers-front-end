import Footer from '../core/components/Footer'
import HomePage from '../features/HomePage/pages'
import Navbar from '../core/components/Navbar'
import React from 'react'

const Home = ({ authContext }) => {
  return (
    <>
      <Navbar authContext={authContext} />
      <HomePage />
      <Footer />
    </>
  )
}

export default Home
