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
    <div
      className={`w-1/2 rounded-none h-40 flex justify-end items-end ${className}`}
      style={{ backgroundImage: `url(${imgSrc})` }}>
      <div className="ml-8 text-secondary2">
        <CameraAlt fontSize="large" />
      </div>
    </div>
  )
}
