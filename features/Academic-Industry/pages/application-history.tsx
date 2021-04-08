import { Assignment } from '@material-ui/icons'
/* eslint-disable react/display-name */
import React, { useContext } from 'react'
import CoreTableWithAction from '../../../core/components/TableWithAction'
import { Observer } from 'mobx-react-lite'
import Link from 'next/link'
import { applicationHistoryContext } from '../context/announcement_application_history_context'

const ApplicationHistory = () => {
  const context = useContext(applicationHistoryContext)

  const column = [
    { title: 'ประกาศรับสมัครงาน', field: 'announcement_title', editable: 'never' },
    { title: 'ID', field: 'announcement_id', editable: 'never', hidden: true },
    { title: 'ID', field: 'application_id', editable: 'never', hidden: true },
    { title: 'Prefix', field: 'name_title', editable: 'never', hidden: true },
    {
      title: 'บริษัท',
      field: 'company_name_th',
      editable: 'never'
    },
    {
      title: 'ชื่อ',
      field: 'first_name',
      editable: 'never'
    },
    {
      title: 'นามสกุล',
      field: 'last_name',
      editable: 'never'
    },
    {
      title: 'สาขาวิชา',
      field: 'curriculum',
      editable: 'never'
    },
    {
      title: 'ชั้นปี',
      field: 'year',
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
      lookup: { 0: 'เรียกสัมภาษณ์', 1: 'รออนุมัติ', 2: 'เสร็จสิ้น', 3: 'ปฏิเสธการรับสมัครงาน' }
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
  ]

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
            <CoreTableWithAction
              column={column}
              data={context?.applications}
              isEditable={true}
              getData={context.getAnnouncementApplicationByAdmin}
              updateData={context.updateApplication}
            />
          )}
        </Observer>
      </div>
    </div>
  )
}

export default ApplicationHistory
