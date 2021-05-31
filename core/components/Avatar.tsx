import { CameraAlt } from '@material-ui/icons'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type AvatarProps = {
  className?: string
  imgSrc?: any
}
export const Avatar = (props: AvatarProps) => {
  const { className, imgSrc } = props
  return (
    <div
      className={`relative w-40 h-40 bg-no-repeat bg-cover flex justify-end items-end rounded-full ${className}`}
      style={{ backgroundImage: `url(${imgSrc})` }}>
      <div className="mr-8 text-secondary2">
        <CameraAlt fontSize="large" />
      </div>
    </div>
  )
}
