import { Card } from '../../../core/components/Card/Card'
import { CardSmall } from '../../../core/components/Card/Small'
import Footer from '../../../core/components/Footer'
import Navbar from 'core/components/Navbar'
import React from 'react'
function index() {
  return (
    <>
      <Navbar />
      <div className="container grid h-screen max-w-screen-lg grid-flow-row gap-16 mx-auto mb-2 grid-row-12">
        <div className="mt-4" />
        <Card
          title="SIT Company"
          tags={['Software House', 'MOU']}
          aboutUs="We are Super Hero Team."
          srcImg="https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g"
        />
        <CardSmall
          title="รับสมัครงานตำแหน่ง Software Engineer"
          tags={['Software Engineer', 'WiL']}
          date="12 มีนาคม - 24 ธันวาคม 2563"
          company="SIT Company"
          srcImg="https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g"
        />
      </div>
      <Footer />
    </>
  )
}

export default index
