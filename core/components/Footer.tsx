import React from 'react'

const Footer = () => {
  return (
    <footer
      style={{
        boxShadow:
          '0px -1px 2px rgba(0, 0, 0, 0.14), 0px -1px 2px rgba(0, 0, 0, 0.12), 0px -1px 3px rgba(0, 0, 0, 0.2)'
      }}
      className="relative flex justify-center h-64 mb-0">
      <div className="container flex flex-row max-w-screen-lg col-span-12">
        <div className="flex-1 pt-12">
          <div className="font-semibold font-prompt text-body-1">ติดต่อเรา</div>
          <div className="mt-2 text-body-1 font-prompt">66 2470 9850</div>
          <div className="mt-2 text-body-1 font-prompt">webadmin@sit.kmutt.ac.th</div>
          <button className="p-2 mt-10 text-white text-body-1 bg-secondary2">Logo</button>
        </div>
        <div className="flex pt-16">
          <div className="mt-32 opacity-25 text-body-2 text-secondary2">
            © School of Information Technology, King Mongkut's University of Technology Thonburi.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
