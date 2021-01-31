import { AddCircle, Delete } from '@material-ui/icons'
import { TextField } from '@material-ui/core'
/* eslint-disable react/display-name */
import React, { useContext } from 'react'

import CoreTable from '../../../core/components/Table'
import { Observer } from 'mobx-react-lite'
import { CoreModal } from '../../../core/components/Modal'
import { modalContext } from '../../../core/contexts/modal_context'

const UserInfo = () => {
  const coreModalContext = useContext(modalContext)

  const column = [
    { title: 'อีเมล', field: 'email' },
    {
      title: 'สิทธิการใช้งาน',
      field: 'role_name'
    },
    {
      title: 'ตั้งค่า',
      field: 'company_id',
      render: () => <Delete className="cursor-pointer text-secondary1" fontSize="large" />
    }
  ]

  const data = [
    {
      email: 'jirattikarn.vil@mail.kmutt.ac.th',
      role_name: 'ผู้จัดการ'
    },
    {
      email: 'peepoi@mail.kmutt.ac.th',
      role_name: 'ผู้ประสานงาน'
    },
    {
      email: 'peepoinaja@mail.kmutt.ac.th',
      role_name: 'ผู้ประสานงาน'
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
                <button className="bg-primary" onClick={coreModalContext.openModal}>
                  <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                    <AddCircle className="mr-1" />
                    เพิ่มผู้ประสานงาน
                  </p>
                </button>
              </div>
              <CoreModal
                buttonSubmit="เพิ่ม"
                title="เพิ่มผู้ประสานงาน"
                content={
                  <div className="w-full">
                    <TextField
                      name="email"
                      label="อีเมล"
                      className="font-sarabun bg-grey-100"
                      fullWidth
                    />
                  </div>
                }
                onSubmit={() => console.log('Just test modal !')}
              />
            </>
          )}
        </Observer>
      </div>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      <div>
        <Observer>{() => <CoreTable column={column} data={data} options={{}} />}</Observer>
      </div>
    </div>
  )
}

export default UserInfo
