import { Fade, Menu, MenuItem } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import {
  AccountCircle as AccountCircleIcon,
  ExitToApp,
  Notifications,
  ViewCarousel
} from '@material-ui/icons'
import Link from 'next/link'
import { navbarContext } from '../contexts/navbar_context'
import { Observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { dropdownLinkAdmin, navLink } from '../config/menuItem'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default function Navbar({ authContext }) {
  const router = useRouter()
  const context = useContext(navbarContext)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {
    context.getNotifications()
  }, [authContext, authContext.permission, context])

  return (
    <Observer>
      {() => (
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
                  <div className="mt-2 font-semibold text-white cursor-pointer font-prompt">
                    <img
                      width="100px"
                      height="30px"
                      src="/image/sit-career-center.svg"
                      alt="SIT Career Center Logo"
                    />
                  </div>
                </Link>
                <ul className="flex flex-row list-none lg:flex-row">
                  {authContext.isLoggedIn && (
                    <>
                      {_.map(navLink, (data, i) => {
                        const renderMenu = _.find(authContext.permission, [
                          'permission_name',
                          data.permission
                        ])
                        return (
                          <>
                            {data.permission === 'general' && (
                              <Link key={i} href={data.path}>
                                <li
                                  className={`${
                                    router.asPath === data.path ? 'bg-secondary1 bg-opacity-25' : ''
                                  } table px-4 py-4 font-prompt font-semibold text-subtitle-1 text-white nav-item hover:shadow-none cursor-pointer hover:bg-secondary1 hover:bg-opacity-25`}>
                                  {data.name}
                                </li>
                              </Link>
                            )}
                            {renderMenu && (
                              <Link key={i} href={data.path}>
                                <li
                                  className={`${
                                    router.asPath === data.path ? 'bg-secondary1 bg-opacity-25' : ''
                                  } table px-4 py-4 font-prompt font-semibold text-subtitle-1 text-white nav-item hover:shadow-none cursor-pointer hover:bg-secondary1 hover:bg-opacity-25`}>
                                  {data.name}
                                </li>
                              </Link>
                            )}
                          </>
                        )
                      })}
                    </>
                  )}
                </ul>
                <div>
                  <div className="relative flex flex-row items-center justify-end w-full h-full cursor-pointer">
                    {authContext.isLoggedIn && (
                      <button
                        onClick={(e) => context.handleClick('showNotification', e)}
                        className="absolute top-0 w-10 h-full mt-1 mr-16 focus:outline-none">
                        <Notifications
                          fontSize="large"
                          className="absolute top-0 text-white cursor-pointer"
                        />
                        {_.filter(context.notifications, ['read_at', null]).length > 0 && (
                          <div className="absolute top-0 z-50 flex items-center justify-center w-4 h-4 ml-10 text-white rounded-full bg-red" />
                        )}
                      </button>
                    )}
                    <AccountCircleIcon
                      aria-controls="fade-menu"
                      aria-haspopup="true"
                      onClick={(e) => context.handleClick('anchorEl', e)}
                      style={{ color: '#ffffff', fontSize: '40px' }}
                    />
                  </div>
                  <div>
                    <Menu
                      id="fade-menu"
                      className="mt-10"
                      style={{ width: '550px' }}
                      anchorEl={context.showNotification}
                      keepMounted
                      TransitionComponent={Fade}
                      open={Boolean(context.showNotification)}
                      onClose={() => context.handleClose('showNotification')}>
                      <div
                        id="scrollbar-custom"
                        style={{ height: '300px' }}
                        className="w-full overflow-y-auto">
                        <p className="ml-2 text-body-2 font-prompt-semibold">การแจ้งเตือน</p>
                        <hr className="opacity-25 bg-secondary2" />
                        {context.notifications.length === 0 && (
                          <div
                            style={{ wordWrap: 'break-word' }}
                            className="flex items-center justify-center w-64 h-24">
                            <p className="text-center text-body-2 font-prompt">ไม่พบการแจ้งเตือน</p>
                          </div>
                        )}
                        {_.map(context.notifications, (data, i) => {
                          return (
                            <div
                              style={{ width: '400px' }}
                              className={`flex h-24 px-4 border-opacity-25 border-b-DEFAULT border-secondary2 ${
                                !data.read_at ? 'bg-white' : 'bg-grey-300'
                              } cursor-pointer`}>
                              <div
                                className={`w-2 h-2 pl-1 pb-1 pr-1 mt-4 rounded-full ${
                                  !data.read_at ? 'bg-red' : 'bg-red opacity-25'
                                }`}
                              />
                              <button
                                key={i}
                                onClick={() => context.updateReadAt(data)}
                                className="flex flex-col items-center w-full h-full pt-2 focus:outline-none">
                                <div
                                  style={{ wordWrap: 'break-word' }}
                                  className="flex flex-col justify-between w-full h-full ml-3">
                                  <span className="text-left font-prompt-light text-body-2">
                                    {data?.message}
                                  </span>
                                  <p className="text-right text-black opacity-50 font-prompt text-body-2">
                                    {dayjs(data?.created_at).locale('th').fromNow()}
                                  </p>
                                </div>
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </Menu>
                    <Menu
                      id="fade-menu"
                      className="w-3/4 mt-10"
                      anchorEl={context.anchorEl}
                      keepMounted
                      TransitionComponent={Fade}
                      open={Boolean(context.anchorEl)}
                      onClose={() => context.handleClose('anchorEl')}>
                      {authContext.isLoggedIn ? (
                        <div>
                          {_.map(dropdownLinkAdmin, (data, j) => {
                            const checkPermissionRender = _.find(authContext.permission, (item) =>
                              _.includes(data.permission, item.permission_name)
                            )
                            const checkRoleRender = _.find(data.role, (item) =>
                              _.includes(item, authContext.roleUser)
                            )
                            return (
                              <>
                                {checkPermissionRender && checkRoleRender && (
                                  <Link href={data.path} key={j}>
                                    <MenuItem onClick={() => context.handleClose('anchorEl')}>
                                      <div className="font-prompt-light text-body-2 text-primary">
                                        {data.icon} {data.name}
                                      </div>
                                    </MenuItem>
                                  </Link>
                                )}
                              </>
                            )
                          })}
                          {authContext.roleUser === 'admin' && (
                            <MenuItem
                              onClick={() => {
                                context.handleClose('anchorEl')
                                context.changeKey('isOpenModalBanner', true)
                              }}>
                              <div className="font-prompt-light text-body-2 text-primary">
                                <ViewCarousel /> จัดการ Banner
                              </div>
                            </MenuItem>
                          )}
                          <MenuItem
                            onClick={() => {
                              context.handleClose('anchorEl')
                              authContext.logout()
                            }}>
                            <span className="font-prompt-light text-body-2 text-red">
                              <ExitToApp /> Logout
                            </span>
                          </MenuItem>
                        </div>
                      ) : (
                        <Link href="/login">
                          <MenuItem onClick={() => context.handleClose('anchorEl')}>
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
      )}
    </Observer>
  )
}
