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
            <div className="font-semibold text-primary font-prompt text-body-1">ติดต่อ</div>
            <div className="mt-2 text-body-1 font-prompt">คุณรุ่งโรจน์ ขวัญโกมล</div>
            <div className="mt-2 text-body-1 font-prompt">Tel: 0-2470-9889</div>
            <div className="mt-2 text-body-1 font-prompt">E-mail: rungroj@sit.kmutt.ac.th</div>
            <Link href="/">
              <div className="pt-10 font-semibold text-white cursor-pointer font-prompt">
                <img
                  height="30px"
                  width="120px"
                  src="/image/sit-career-center-footer.svg"
                  alt="sit logo"
                />
              </div>
            </Link>
          </div>
          <div className="col-span-8 pt-12">
            <div>
              <div className="font-semibold text-primary font-prompt text-body-1">สถานที่ทำการ</div>
              <div className="mt-2 text-body-1 font-prompt">
                126 คณะเทคโนโลยีสารสนเทศ ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
              </div>
            </div>
            <div className="mt-2">
              <div className="font-semibold text-primary font-prompt text-body-1">วันที่ทำการ</div>
              <div className="mt-2 text-body-1 font-prompt">
                วันจันทร์ – วันศุกร์ เวลา 08.30 น. – 16.30 น.
              </div>
            </div>
            <div className="pt-8 cursor-pointer font-prompt">
              <p className="opacity-50 text-body-2 text-secondary2">
                © School of Information Technology, King Mongkut&apos;s University of Technology
                Thonburi. <br />
                Power by
                <Link href="https://github.com/SIT-Careers-Project">
                  <span className="underline cursor-pointer">SIT Career Center</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
