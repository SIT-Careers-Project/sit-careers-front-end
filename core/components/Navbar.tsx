import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const navLink = [
    { path: '/', name: 'หน้าหลัก' },
    { path: '/announcement', name: 'ประกาศรับสมัครงาน' },
    { path: '/company-info', name: 'ข้อมูลบริษัท' },
    { path: '/contact', name: 'ติดต่อเรา' },
    { path: '/todo-list', name: 'รายการที่ทำ' }
  ]

  return (
    <div className="flex justify-center gap-16 mx-auto grid-col-12">
      <nav
        style={{
          height: '55px',
          boxShadow:
            '0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)'
        }}
        className="flex justify-center w-full h-2 shadow-inner navbar-expand-lg">
        <div className="container max-w-screen-lg">
          <div className="flex justify-between">
            <div className="py-5 font-semibold font-prompt">Logo Logo</div>
            <ul className="flex flex-row list-none lg:flex-row">
              {navLink.map((data, i) => {
                return (
                  <Link key={i} href={data.path}>
                    <li
                      className={`${
                        router.asPath === data.path ? 'bg-secondary1 bg-opacity-25' : ''
                      } table px-4 py-5 font-prompt font-semibold text-subtitle-1 text-primary nav-item hover:shadow-none hover:bg-secondary1 hover:bg-opacity-25`}>
                      {data.name}
                    </li>
                  </Link>
                )
              })}
            </ul>
            <div className="py-5">
              <AccountCircleIcon />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
