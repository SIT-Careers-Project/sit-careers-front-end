import React from 'react'

const CorePrimaryButton = (props) => {
  const { onClick, className, children } = props
  return (
    <button
      className={`w-full bg-secondary1 cursor-pointer shadow-md btn-grad ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default CorePrimaryButton
