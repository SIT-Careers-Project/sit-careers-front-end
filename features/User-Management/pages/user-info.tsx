/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-fallthrough */
import { AddCircle, Delete } from '@material-ui/icons'
import { Chip, CircularProgress } from '@material-ui/core'
/* eslint-disable react/display-name */
import React, { useContext, useEffect, useCallback, useMemo, useState } from 'react'
import CoreTable from 'core/components/Table'
import { Observer } from 'mobx-react-lite'
import { CoreModal } from 'core/components/Modal'
import { checkRoleRender } from 'core/services/utils'
import { modalContext } from 'core/contexts/modal_context'
import { AlertContext } from 'core/contexts/alert_context'
import { userInfoPageContext } from '../contexts/user_info_page_context'
import { toJS } from 'mobx'
import { ModalAdmin } from '../components/Modal/Admin'
import { ModalCompany } from '../components/Modal/Company'

const UserInfo = ({ authContext }) => {
  const [role, setRole] = useState('')
  const coreModalContext = useContext(modalContext)
  const alertContext = useContext(AlertContext)
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
            {authContext.roleUser === 'admin' && (
              <CoreTable
                column={AdminColumn}
                data={toJS(context.users)}
                getData={getData}
                options={{
                  selection: true
                }}
                onSelectionChange={(rows) => {
                  if (rows.length === 0) {
                    context.keyChange('userDelete', [])
                    context.keyChange('disableTrashButton', true)
                  } else {
                    context.keyChange('userDelete', [...rows])
                    context.keyChange('disableTrashButton', false)
                  }
                }}
              />
            )}
            {authContext.roleUser !== 'admin' && (
              <CoreTable column={column} data={toJS(context.users)} getData={getData} />
            )}
          </>
        )}
      </Observer>
    )
  }, [context.users])

  useEffect(() => {
    context.keyChange('modal', coreModalContext)
    context.keyChange('modalDelete', coreModalContext)
    context.keyChange('alert', alertContext)
    setTimeout(() => {
      setRole(authContext.roleUser)
    }, 2500)
    getData()
    return () => {
      context.keyChange('disableTrashButton', true)
      context.alert.clearAlert()
    }
  }, [authContext])

  const AdminColumn = [
    { title: 'User Id', field: 'user_id', hidden: true },
    {
      title: 'บริษัท',
      field: 'company_name_th',
      render: function (rowData) {
        return (
          <div className="flex flex-row">
            <div>
              <p className="font-sarabun-samibold text-primary">{rowData.company_name_th}</p>
              <p className="text-body-2 text-secondary2">{rowData.company_name_en}</p>
            </div>
          </div>
        )
      }
    },
    { title: 'อีเมล', field: 'email' },
    {
      title: 'สิทธิการใช้งาน',
      field: 'role_name',
      render: (rowData) => {
        const roleName = checkRoleRender(rowData?.role_name)
        return <p>{roleName}</p>
      }
    },
    {
      title: 'สถานะการใช้งาน',
      field: 'status',
      render: function (rowData) {
        return (
          <>
            {rowData.status === 'active' ? (
              <div>
                <Chip
                  style={{ backgroundColor: '#D8F6CB', color: '#36A05B' }}
                  label={`${rowData.status}`}
                />
              </div>
            ) : (
              <div>
                <Chip label={`${rowData.status}`} />
              </div>
            )}
          </>
        )
      }
    }
  ]

  const column = [
    { title: 'User Id', field: 'user_id', hidden: true },
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
        <div className="flex justify-end grid-cols-12 gap-x-3">
          {!role && <CircularProgress size={30} />}
        </div>
        {role && (
          <>
            {(authContext.roleUser === 'admin' || authContext.roleUser === 'manager') && (
              <Observer>
                {() => (
                  <>
                    <div className="flex justify-end grid-cols-12 gap-x-3" id="button-add-user">
                      <button
                        className="bg-primary focus:outline-none"
                        onClick={() => {
                          context.keyChange('modalDelete', false)
                          context.modal.openModal()
                        }}>
                        <p className="px-5 py-2 text-white cursor-pointer font-prompt text-subtitle-1">
                          <AddCircle className="mr-1" />
                          เพิ่มผู้ใช้งาน
                        </p>
                      </button>
                      {authContext.roleUser === 'admin' && (
                        <button
                          disabled={context.disableTrashButton}
                          onClick={() => {
                            context.keyChange('modalDelete', true)
                            context.modal.openModal()
                          }}
                          className={`flex items-center focus:outline-none justify-center w-10 ${
                            context.disableTrashButton
                              ? 'text-grey-200 cursor-default bg-secondary2 opacity-25'
                              : 'text-white cursor-pointer bg-red'
                          }`}>
                          <Delete fontSize="default" />
                        </button>
                      )}
                    </div>
                    {authContext.roleUser === 'admin' && !context.modalDelete && <ModalAdmin />}
                    {authContext.roleUser === 'manager' && !context.modalDelete && <ModalCompany />}
                  </>
                )}
              </Observer>
            )}
          </>
        )}
      </div>
      <Observer>
        {() => (
          <>
            {context.modalDelete && (
              <CoreModal
                title="ลบผู้ใช้งาน"
                buttonSubmit="ลบผู้ใช้งาน"
                color="bg-red"
                content={
                  <span className="mb-5 font-prompt text-subtitle-1">
                    คุณต้องการลบผู้ใช้งานหรือไม่
                  </span>
                }
                onSubmit={context.onDeleteUserByAdmin}
              />
            )}
          </>
        )}
      </Observer>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      <div>{Table}</div>
    </div>
  )
}

export default UserInfo
