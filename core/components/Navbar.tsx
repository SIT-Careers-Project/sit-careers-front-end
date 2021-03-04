import { Fade, Menu, MenuItem } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { AccountCircle as AccountCircleIcon, ExitToApp } from '@material-ui/icons'
import Link from 'next/link'
import { navbarContext } from '../contexts/navbar_context'
import { useObserver } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { dropdownLink, navLink } from '../config/menuItem'
import { AuthContext } from '../../core/contexts/auth_context'

export default function Navbar() {
  const router = useRouter()
  const context = useContext(navbarContext)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.fetchMe()
  }, [authContext])

  return useObserver(() => (
    <div className="flex justify-center gap-16 mx-auto grid-col-12">
      <nav
        style={{
          height: '55px',
          zIndex: 100,
          boxShadow:
            '0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)'
        }}
        data-cy="core-navbar"
        className="fixed flex justify-center w-full h-2 shadow-inner bg-primary navbar-expand-lg">
        <div style={{ width: '1280px' }} className="h-full max-w-screen-lg">
          <div className="flex flex-row items-center justify-between h-full">
            <Link href="/">
              <div
                style={{ height: '40px', width: '82px' }}
                className="mt-2 font-semibold text-white cursor-pointer font-prompt">
                <img src="/image/sit-logo.png" alt="sit logo" />
              </div>
            </Link>
            <ul className="flex flex-row list-none lg:flex-row">
              {authContext.isLoggedIn && (
                <>
                  {_.map(navLink, (data, i) => {
                    return (
                      <Link key={i} href={data.path}>
                        <li
                          className={`${
                            router.asPath === data.path ? 'bg-secondary1 bg-opacity-25' : ''
                          } table px-4 py-4 font-prompt font-semibold text-subtitle-1 text-white nav-item hover:shadow-none cursor-pointer hover:bg-secondary1 hover:bg-opacity-25`}>
                          {data.name}
                        </li>
                      </Link>
                    )
                  })}
                </>
              )}
            </ul>
            <div>
              <div className="flex flex-row items-center justify-end w-full h-full cursor-pointer">
                <AccountCircleIcon
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={context.handleClick}
                  style={{ color: '#ffffff', fontSize: '40px' }}
                />
              </div>
              <div className="">
                <Menu
                  id="fade-menu"
                  className="w-3/4 mt-10"
                  anchorEl={context.anchorEl}
                  keepMounted
                  TransitionComponent={Fade}
                  open={Boolean(context.anchorEl)}
                  onClose={context.handleClose}>
                  {authContext.isLoggedIn ? (
                    <>
                      {_.map(dropdownLink, (data, j) => (
                        <Link href={data.path} key={j}>
                          <MenuItem onClick={context.handleClose}>
                            <div className="font-prompt-light text-body-2 text-primary">
                              {data.icon} {data.name}
                            </div>
                          </MenuItem>
                        </Link>
                      ))}
                      <MenuItem
                        onClick={() => {
                          context.handleClose()
                          authContext.logout()
                        }}>
                        <span className="font-prompt-light text-body-2 text-red">
                          <ExitToApp /> Logout
                        </span>
                      </MenuItem>
                    </>
                  ) : (
                    <Link href="/login">
                      <MenuItem onClick={context.handleClose}>
                        <span className="font-prompt-light text-body-2 text-primary">
                          <ExitToApp /> Login
                        </span>
                      </MenuItem>
                    </Link>
                  )}
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  ))
}
