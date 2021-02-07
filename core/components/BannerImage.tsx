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
      className={`w-full rounded-none h-48 flex justify-end items-end ${className}`}
      style={{ backgroundImage: `url(${imgSrc})` }}>
      <div className="flex flex-col items-center justify-center w-8 h-8 -mb-3 -mr-3 text-white rounded-full bg-secondary1">
        <CameraAlt fontSize="small" />
      </div>
    </div>
  )
}
