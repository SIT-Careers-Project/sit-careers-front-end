import { Assignment } from '@material-ui/icons'
/* eslint-disable react/display-name */
import React, { useState } from 'react'
import CoreTable from '../../../core/components/Table'
import { Observer } from 'mobx-react-lite'
import Link from 'next/link'

const ApplicationHistory = () => {
  const [column] = useState([
    { title: 'ประกาศรับสมัครงาน', field: 'announcement_title', editable: 'never' },
    {
      title: 'บริษัท',
      field: 'company_name_en',
      editable: 'never'
    },
    {
      title: 'วันที่สมัคร',
      field: 'application_date',
      editable: 'never'
    },
    {
      title: 'สถานะ',
      field: 'status',
      editable: 'onUpdate',
      lookup: { 1: 'เรียกสัมภาษณ์', 2: 'รออนุมัติ', 3: 'เสร็จสิ้น' }
    },
    {
      title: 'รายละเอียด',
      field: 'application_id',
      editable: 'never',
      render: () => (
        <Link href="/academic-industry/form-application">
          <Assignment className="cursor-pointer text-secondary1" fontSize="large" />
        </Link>
      )
    }
  ])

  const [data, setData] = useState([
    {
      announcement_title: 'รับสมัคร Software Engineer Internship 2 อัตรา',
      company_name_en: 'SIT Company',
      application_date: '31/01/2021',
      status: 1
    },
    {
      announcement_title: 'รับสมัคร IT Support',
      company_name_en: 'Stark Industry',
      application_date: '01/01/2021',
      status: 2
    },
    {
      announcement_title: 'รับ FullTime/PartTime Infra 2 ตำแหน่ง',
      company_name_en: 'Google Co.',
      application_date: '12/12/2020',
      status: 3
    }
  ])

  return (
    <div className="w-full h-auto max-w-screen-lg mb-10 bg-grey1">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">ประวัติการสมัครงาน</p>
        </div>
      </div>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      <div>
        <Observer>
          {() => (
            <CoreTable
              column={column}
              data={data}
              options={{}}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      const dataUpdate = [...data]
                      const index = oldData.tableData.id
                      dataUpdate[index] = newData
                      setData([...dataUpdate])
                      resolve
                    }, 1000)
                  })
              }}
            />
          )}
        </Observer>
      </div>
    </div>
  )
}

export default ApplicationHistory
