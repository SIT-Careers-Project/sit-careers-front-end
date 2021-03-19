import React from 'react'
import Image from 'next/image'

export const NotAuthorized = () => {
  return (
    <div style={{ minHeight: '80vh' }} className="flex flex-col items-center justify-center w-full">
      <Image src="/image/401.svg" width={380} height={376} alt="Not Authorized" />
      <p className="mt-5 text-heading-2 font-prompt-semibold text-primary">Unauthorized</p>
      <p className="font-prompt text-heading-5">
        การเข้าถึงถูกปฏิเสธเนื่องจาก permission ไม่ถูกต้อง
      </p>
    </div>
  )
}
