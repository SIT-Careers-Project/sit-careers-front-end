import { CameraAlt } from '@material-ui/icons'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type BannerImage = {
  className?: string
  imgSrc?: any
}
export const BannerImages = (props: BannerImage) => {
  const { className, imgSrc } = props
  return (
    <div>
      <div>
        {imgSrc !== 'https://s3.amazonaws.com/cover_announcement/-' && imgSrc !== null ? (
          <div
            className={`w-full rounded h-48 flex items-center justify-center ${className}`}
            style={{ backgroundImage: `url(${imgSrc})` }}></div>
        ) : (
          <div
            className={`w-full rounded h-48 flex items-center justify-center ${className}`}
            style={{ backgroundImage: `url(${imgSrc})` }}>
            <div className="text-grey4">
              <CameraAlt fontSize="large" />
              <div className="font-semibold font-prompt text-body-1 pt-3">
                <p>รูปภาพสำหรับประกาศรับสมัครงาน</p>
                <p>ไฟล์นามสกุล .png และ .jpg ต้องมีขนาดไม่เกิน 5MB</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end items-end">
        <div className="flex flex-col items-center justify-center w-8 h-8 -m-3 text-white rounded-full bg-secondary1">
          <CameraAlt fontSize="small" />
        </div>
      </div>
    </div>
  )
}
