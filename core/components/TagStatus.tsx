import React from 'react'

export const TagStatus = ({ status }) => {
  return (
    <>
      {status === 'OPEN' ? (
        <span className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-green2">
          เปิดรับสมัคร
        </span>
      ) : (
        <span className="px-1 mr-2 text-sm text-white rounded font-prompt text-body-2 bg-red">
          ปิดรับสมัคร
        </span>
      )}
    </>
  )
}
