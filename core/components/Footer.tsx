import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer
      style={{
        boxShadow:
          '0px -1px 2px rgba(0, 0, 0, 0.14), 0px -1px 2px rgba(0, 0, 0, 0.12), 0px -1px 3px rgba(0, 0, 0, 0.2)'
      }}
      data-cy="core-footer"
      className="relative justify-center h-64">
      <div className="max-w-screen-lg mx-auto">
        <div className="grid h-full grid-flow-row grid-cols-12 gap-5">
          <div className="col-span-4 pt-12">
            <div className="font-semibold text-primary font-prompt text-body-1">ติดต่อเรา</div>
            <div className="mt-2 text-body-1 font-prompt">66 2470 9850</div>
            <div className="mt-2 text-body-1 font-prompt">webadmin@sit.kmutt.ac.th</div>
            <Link href="/">
              <div
                style={{ height: '30px', width: '120px' }}
                className="mt-10 font-semibold text-white cursor-pointer font-prompt">
                <img src="/image/sit-career-center-footer.svg" alt="sit logo" />
              </div>
            </Link>
          </div>
          <div className="relative flex flex-col justify-center h-full col-span-8">
            <div>
              <p className="mt-2 text-body-1 text-primary font-prompt-semibold">สถานที่ทำการ</p>
              <p className="mt-2 mb-2 text-body-1 font-prompt">
                126 คณะเทคโนโลยีสารสนเทศ ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
              </p>
              <p className="text-body-1 text-primary font-prompt-semibold">วันที่ทำการ</p>
              <p className="mt-2 text-body-1 font-prompt">
                วันจันทร์ – วันศุกร์ เวลา 08.30 น. – 16.30 น.
              </p>
            </div>
            <div className="absolute bottom-0">
              <p className="opacity-25 text-body-2 text-secondary2">
                © School of Information Technology, King Mongkut&apos;s University of Technology
                Thonburi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
