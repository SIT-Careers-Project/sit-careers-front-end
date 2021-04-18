/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
import { AddCircle } from '@material-ui/icons'
/* eslint-disable react/display-name */
import React, { useContext, useEffect, useCallback, useMemo } from 'react'
import CoreTable from 'core/components/Table'
import { Observer } from 'mobx-react-lite'
import { checkRoleRender } from 'core/services/utils'
import { modalContext } from 'core/contexts/modal_context'
import { userInfoPageContext } from '../contexts/user_info_page_context'
import { toJS } from 'mobx'
import { ModalAdmin } from '../components/Modal/Admin'
import { ModalCompany } from '../components/Modal/Company'

const UserInfo = ({ authContext }) => {
  const coreModalContext = useContext(modalContext)
  const context = useContext(userInfoPageContext)

  const getData = useCallback(() => {
    if (authContext.roleUser === 'admin') {
      context.getUserByAdmin()
    } else {
      context.getUserByCompany()
    }
  }, [])

  const Table = useMemo(() => {
    return (
      <Observer>
        {() => (
          <>
            <CoreTable
              column={column}
              data={toJS(context.users)}
              getData={getData}
              options={{
                selection: true
              }}
              actions={[
                {
                  tooltip: 'Remove All Selected Users',
                  icon: 'delete',
                  onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                }
              ]}
            />
          </>
        )}
      </Observer>
    )
  }, [context.users])

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    getData()
  }, [])

  const column = [
    { title: 'อีเมล', field: 'email' },
    {
      title: 'สิทธิการใช้งาน',
      field: 'role_name',
      render: (rowData) => {
        const roleName = checkRoleRender(rowData?.role_name)
        return <p>{roleName}</p>
      }
    }
  ]

  return (
    <div className="w-full h-auto max-w-screen-lg mb-10 bg-grey1">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">จัดการผู้ใช้งาน</p>
        </div>
        <Observer>
          {() => (
            <>
              <div className="flex justify-end grid-cols-12 gap-x-8" id="button-add-user">
                <button
                  className="bg-primary focus:outline-none"
                  onClick={coreModalContext.openModal}>
                  <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                    <AddCircle className="mr-1" />
                    เพิ่มผู้ประสานงาน
                  </p>
                </button>
              </div>
              {authContext.roleUser === 'admin' && <ModalAdmin />}
              {authContext.roleUser === 'manager' && <ModalCompany />}
            </>
          )}
        </Observer>
      </div>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      <div>{Table}</div>
    </div>
  )
}

export default UserInfo
