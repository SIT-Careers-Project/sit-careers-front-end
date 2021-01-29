import Footer from '../Footer'
import Navbar from '../Navbar'
import React from 'react'

type MainLayoutProps = {
  children: React.ReactElement
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props
  return (
    <>
      <div className="h-auto bg-cover bg-grey1">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  )
}
