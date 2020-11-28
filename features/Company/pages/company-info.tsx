import { Card } from '../../../core/components/Card/Card'
import React from 'react'

const CompanyInfo = () => {
  return (
    <div className="w-full max-w-screen-lg my-6 bg-white border-opacity-50 rounded font-prompt border-DEFAULT border-secondary2">
      <Card
        title="SIT Company"
        tags={['Software House', 'MOU']}
        aboutUs="We are Super Hero Team."
        srcImg="https://i.picsum.photos/id/1000/5626/3635.jpg?hmac=qWh065Fr_M8Oa3sNsdDL8ngWXv2Jb-EE49ZIn6c0P-g"
      />
    </div>
  )
}

export default CompanyInfo
