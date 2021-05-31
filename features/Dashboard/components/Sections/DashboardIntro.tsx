import Image from 'next/image'
import React from 'react'

export const DashboardAnalysisSection = () => {
  return (
    <div style={{ height: '900px' }} className="bg-grey-200">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-12 gap-5 py-20">
          <div className="col-span-5 pt-20">
            <div className="flex flex-col">
              <p className="text-heading-3 font-prompt-medium text-primary">
                วิเคราะห์ข้อมูลของเว็บไซต์
              </p>
              <p className="mt-5 text-heading-6 text-secondary2 font-prompt">
                ข้อมูลที่ผ่านการวิเคราะห์สำหรับผู้ใช้งานและนักศึกษาคณะเทคโนโลยีสารสนเทศ
                เพื่อเพิ่มโอกาสในการทำงานกับบริษัทชั้นนำ
              </p>
            </div>
          </div>
          <div className="col-span-7">
            <Image src="/image/analysis.svg" width={560} height={537} />
          </div>
        </div>
      </div>
    </div>
  )
}
