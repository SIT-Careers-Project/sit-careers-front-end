/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react'
import CoreTable from '../../../core/components/Table'
import { Observer } from 'mobx-react-lite'
import BasicDateRangePicker from '../../../core/components/DateRangePicker'
import { reportInfoPageContext } from '../context/report_info_page_context'
import getConfig from 'next/config'
import { selectData, data } from '../services/constantVariable'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const { publicRuntimeConfig } = getConfig()

const ReportInfo = () => {
  const context = useContext(reportInfoPageContext)
  const [selectedDate, handleDateChange] = React.useState([null, null])

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#295B8D'
      },
      secondary: {
        main: '#168FBD'
      }
    }
  })

  useEffect(() => {
    context
  }, [context])

  return (
    <div className="w-full max-w-screen-lg pb-10">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">ดาวน์โหลดรายงานสรุป</p>
        </div>
      </div>
      <div className="w-full h-1 mt-4 mb-6 bg-secondary1" />
      <div className="flex flex-row items-center w-full max-w-screen-lg mx-auto mt-5 bg-white shadow-lg rounded-lg font-prompt p-5 my-5">
        <p className="pr-5 font-sarabun-meduim text-body-2">เลือกช่วงเวลา:</p>
        <BasicDateRangePicker onClick={handleDateChange} value={selectedDate} />
      </div>
      <Observer>
        {() => (
          <>
            <a
              href={`${publicRuntimeConfig.s3_url}${context?.pathFileCompanies}`}
              target="_self"
              id="company_download"
              className="hidden">
              <p>ดาวโหลดบริษัท</p>
            </a>
            <a
              href={`${publicRuntimeConfig.s3_url}${context?.pathFileDashboard}`}
              target="_self"
              id="dashboard_download"
              className="hidden">
              <p>ดาวโหลด dashboard</p>
            </a>
            <a
              href={`${publicRuntimeConfig.s3_url}${context?.pathFileAnnouncements}`}
              target="_self"
              id="announcement_download"
              className="hidden">
              <p>ดาวโหลดประกาศรับสมัครงาน</p>
            </a>
          </>
        )}
      </Observer>
      <Observer>
        {() => (
          <MuiThemeProvider theme={theme}>
            <CoreTable
              title={<p className="pr-5 font-sarabun-meduim text-body-2">เลือกข้อมูลที่ต้องการ</p>}
              column={selectData}
              data={data}
              options={{
                selection: true,
                search: false,
                showTitle: true
              }}
              getData={() => console.log('hello')}
              onSelectionChange={(rows) => context.setSelectRows(rows)}
              action={[
                {
                  tooltip: 'Export Data',
                  icon: 'get_app',
                  onClick: () => {
                    if (context.selectRows.includes(0)) {
                      context.getCompaniesByFilterDate(selectedDate).then(() => {
                        const link = document.getElementById('company_download')
                        link.setAttribute(
                          'download',
                          `${publicRuntimeConfig.s3_url}${context?.pathFileCompanies}`
                        )
                        link.click()
                      })
                    }
                    if (context.selectRows.includes(1)) {
                      context.getAnnouncementsByFilterDate(selectedDate).then(() => {
                        const link = document.getElementById('announcement_download')
                        link.setAttribute(
                          'download',
                          `${publicRuntimeConfig.s3_url}${context?.pathFileAnnouncements}`
                        )
                        link.click()
                      })
                    }
                    if (context.selectRows.includes(2)) {
                      context.getDashboardByFilterDate(selectedDate).then(() => {
                        const link = document.getElementById('dashboard_download')
                        link.setAttribute(
                          'download',
                          `${publicRuntimeConfig.s3_url}${context?.pathFileDashboard}`
                        )
                        link.click()
                      })
                    }
                  }
                }
              ]}
            />
          </MuiThemeProvider>
        )}
      </Observer>
    </div>
  )
}
export default ReportInfo
