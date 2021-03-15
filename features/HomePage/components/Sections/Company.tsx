import Image from 'next/image'
import Primary from '../../../../core/components/Button/Primary'
import React from 'react'
import Link from 'next/link'

export const CompanySection = () => {
  return (
    <div
      className="absolute bottom-0 w-full bg-fixed bg-grey-fbfcfd"
      style={{
        background: 'url(/image/bg_wave.svg)',
        height: '900px',
        width: '100vw',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
      <div className="h-full max-w-screen-lg mx-auto">
        <div className="grid h-full grid-cols-12 gap-5 pt-64">
          <div className="flex flex-col items-center justify-center col-span-7">
            <Image src="/image/company.svg" width={562} height={483} />
          </div>
          <div className="flex flex-col items-end justify-center col-span-5 text-right">
            <div className="flex flex-col">
              <p className="text-heading-3 font-prompt-medium text-primary">
                โอกาสร่วมงานกับบริษัทชั้นนำในไทย
              </p>
              <p className="mt-5 text-heading-6 text-secondary2 font-prompt">
                คณะเทคโนโลยีสารสนเทศได้รวบรวมเหล่าบริษัท ชั้นนำเพื่อนักศึกษาไว้แล้วที่นี่
                ไม่อยากพลาดโอกาส ในการทำงาน ดูข้อมูลของบริษัทต่าง ๆ ได้เลย
              </p>
            </div>
            <div className="w-2/3">
              <Link href="/company/all-company">
                <Primary className="h-16 mt-6 rounded-full">
                  <span className="text-white font-prompt text-heading-5">ค้นหาบริษัท</span>
                </Primary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
