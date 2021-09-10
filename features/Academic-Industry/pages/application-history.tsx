/* eslint-disable react/display-name */
import { Assignment, GetApp } from '@material-ui/icons'
import React, { useContext, useEffect } from 'react'
import { Observer } from 'mobx-react-lite'
import Link from 'next/link'
import CoreTable from '../../../core/components/Table'
import { applicationHistoryContext } from '../context/announcement_application_history_context'
import { AlertContext } from 'core/contexts/alert_context'

const ApplicationHistory = ({ authContext }) => {
  const context = useContext(applicationHistoryContext)
  const alertContext = useContext(AlertContext)

  useEffect(() => {
    context.keyChange('alert', alertContext)
    if (authContext.roleUser === 'admin' || authContext.roleUser === 'viewer') {
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
      title: 'อัพเดตล่าสุด',
      filed: 'updated_at',
      render: (rowData) => new Date(rowData.updated_at).toLocaleDateString('en-GB')
    },
    {
      title: 'รายละเอียด',
      field: 'announcement_resume_id',
      render: (rowData) => (
        <Link href={`/academic-industry/applications/${rowData.announcement_resume_id}`}>
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
        <div>
          {(authContext.roleUser === 'manager' || authContext.roleUser === 'coordinator') && (
            <button
              className="bg-primary focus:outline-none"
              onClick={() => {
                context.createApplicationReportByCompany().then((response) => {
                  const fileURL = window.URL.createObjectURL(new Blob([response?.data]))
                  const fileLink = document.createElement('a')
                  fileLink.href = fileURL
                  fileLink.setAttribute('download', 'SIT_CC_application_report.zip')
                  document.body.appendChild(fileLink)
                  fileLink.click()
                  fileLink.remove()
                })
              }}>
              <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                <GetApp className="mr-1" />
                ประวัติการสมัครทั้งหมด
              </p>
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      <div>
        <Observer>
          {() => (
            <>
              {(authContext.roleUser === 'admin' || authContext.roleUser === 'viewer') && (
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
