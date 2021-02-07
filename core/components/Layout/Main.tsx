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
      <div className="relative min-h-full bg-cover bg-grey1">
        <div>
          <Navbar />
        </div>
        <div className="mb-20">{children}</div>
        <div className="absolute w-full">
          <Footer />
        </div>
      </div>
    </>
  )
}
