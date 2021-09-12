import Image from 'next/image'
import Primary from '../../../../core/components/Button/Primary'
import React from 'react'
import Link from 'next/link'

export const AnnouncementSection = () => {
  return (
    <div style={{ height: '900px' }} className="bg-grey-200">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-12 gap-5 py-20">
          <div className="col-span-5">
            <div className="flex flex-col">
              <p className="text-heading-3 font-prompt-medium text-primary">
                สมัครงานง่ายๆ ไม่ยุ่งยาก
              </p>
              <p className="mt-5 text-heading-6 text-secondary2 font-prompt">
                นักศึกษาคณะเทคโนโลยีสารสนเทศไม่ต้องเสียเวลา หางานในหลายเว็บไซต์
                เรามีงานมากมายให้นักศึกษา ค้นหา งานใหม่ที่ตรงใจคุณรออยู่ที่นี่แล้ว
              </p>
            </div>
            <div className="w-2/3">
              <Link href="/academic-industry/announcements">
                <Primary className="h-16 mt-6 rounded-full focus:outline-none">
                  <span className="text-white font-prompt text-heading-5">ค้นหางาน</span>
                </Primary>
              </Link>
            </div>
          </div>
          <div className="col-span-7">
            <Image
              src="/image/announcement.svg"
              width={560}
              alt="SIT Career Center Announcment"
              height={537}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
