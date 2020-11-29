import { Button, Fade, Menu, MenuItem } from '@material-ui/core'
import React, { useContext } from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import { navbarContext } from '../contexts/navbar_context'
import { useObserver } from 'mobx-react-lite'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const context = useContext(navbarContext)
  const navLink = [
    { path: '/', name: 'หน้าหลัก' },
    { path: '/announcement', name: 'ประกาศรับสมัครงาน' },
    { path: '/company-info', name: 'ข้อมูลบริษัท' },
    { path: '/contact', name: 'ติดต่อเรา' }
  ]

  return useObserver(() => (
    <div className="flex justify-center gap-16 mx-auto grid-col-12">
      <nav
        style={{
          height: '55px',
          zIndex: 100,
          boxShadow:
            '0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)'
        }}
        className="fixed flex justify-center w-full h-2 shadow-inner bg-grey-100 navbar-expand-lg">
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
                      } table px-4 py-5 font-prompt font-semibold text-subtitle-1 text-primary nav-item hover:shadow-none cursor-pointer hover:bg-secondary1 hover:bg-opacity-25`}>
                      {data.name}
                    </li>
                  </Link>
                )
              })}
            </ul>
            <div className="">
              <Button
                aria-controls="fade-menu"
                className="h-full p-0 text-right"
                aria-haspopup="true"
                onClick={context.handleClick}>
                <AccountCircleIcon fontSize="large" />
              </Button>
              <div className="text-left">
                <Menu
                  id="fade-menu"
                  className="w-64 mt-10"
                  anchorEl={context.anchorEl}
                  keepMounted
                  TransitionComponent={Fade}
                  open={Boolean(context.anchorEl)}
                  onClose={context.handleClose}>
                  <Link href="/company/info-management">
                    <MenuItem onClick={context.handleClose}>
                      <span className="font-prompt-light text-body-2 text-primary">
                        จัดการข้อมูลบริษัท
                      </span>
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  ))
}
