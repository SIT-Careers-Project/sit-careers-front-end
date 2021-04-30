/* eslint-disable react/display-name */
import { Assignment } from '@material-ui/icons'
import React, { useContext, useEffect } from 'react'
import { Observer } from 'mobx-react-lite'
import Link from 'next/link'
import CoreTable from '../../../core/components/Table'
import { applicationHistoryContext } from '../context/announcement_application_history_context'

const ApplicationHistory = ({ authContext }) => {
  const context = useContext(applicationHistoryContext)

  useEffect(() => {
    if (authContext.roleUser === 'admin') {
      context.getAnnouncementApplicationByAdmin()
    } else if (authContext.roleUser === 'manager' || authContext.roleUser === 'coordinator') {
      context.getAnnouncementApplicationByCompany()
    } else if (authContext.roleUser === 'student') {
      context.getAnnouncementApplicationByStudent()
    }
  }, [authContext.roleUser, context])

  const column = [
    { title: 'ประกาศรับสมัครงาน', field: 'announcement_title', editable: 'never' },
    {
      title: 'บริษัท',
      field: 'company_name_th'
    },
    {
      title: 'ชื่อผู้สมัคร',
      field: 'first_name'
    },
    {
      title: 'วันที่สมัคร',
      field: 'created_at',
      render: (rowData) => new Date(rowData.created_at).toLocaleDateString('en-GB')
    },
    {
      title: 'สถานะ',
      field: 'status'
    },
    {
      title: 'รายละเอียด',
      field: 'announcement_resume_id',
      render: (rowData) => (
        <Link href={`/academic-industry/applications/${rowData.resume_id}`}>
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
            <>
              {authContext.roleUser === 'admin' && (
                <CoreTable
                  column={column}
                  data={context?.applications}
                  getData={context.getAnnouncementApplicationByAdmin}
                  options={{ search: true }}
                />
              )}
              {(authContext.roleUser === 'manager' || authContext.roleUser === 'coordinator') && (
                <CoreTable
                  column={column}
                  data={context?.applications}
                  getData={context.getAnnouncementApplicationByCompany}
                  options={{ search: true }}
                />
              )}
              {authContext.roleUser === 'student' && (
                <CoreTable
                  column={column}
                  data={context?.applications}
                  getData={context.getAnnouncementApplicationByStudent}
                  options={{ search: true }}
                />
              )}
            </>
          )}
        </Observer>
      </div>
    </div>
  )
}

export default ApplicationHistory
