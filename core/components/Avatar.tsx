import React from 'react'

type AvatarProps = {
  className?: string
}
export const Avatar = (props: AvatarProps) => {
  const { className } = props
  return (
    <div className={`w-40 h-40 rounded-full ${className}`}>
      {/* <img alt="Avatar" scr="/public/image/avatar.png" /> */}
    </div>
  )
}
