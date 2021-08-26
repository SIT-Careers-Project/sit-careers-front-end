/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react'
import CoreTable from '../../../core/components/Table'
import { Observer } from 'mobx-react-lite'
import BasicDateRangePicker from '../../../core/components/DateRangePicker'
import { reportInfoPageContext } from '../context/report_info_page_context'
import { selectData, data } from '../services/constantVariable'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

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
      <div className="flex flex-row items-center w-full max-w-screen-lg p-5 mx-auto my-5 mt-5 bg-white rounded-lg shadow-lg font-prompt">
        <p className="pr-5 font-sarabun-meduim text-body-2">เลือกช่วงเวลา:</p>
        <BasicDateRangePicker onClick={handleDateChange} value={selectedDate} />
      </div>
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
                    if (context.rowApplication) {
                      context.createApplicationReportByAdmin(selectedDate).then((response) => {
                        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
                        const fileLink = document.createElement('a')
                        fileLink.href = fileURL
                        fileLink.setAttribute('download', 'SIT_CC_application_report.zip')
                        document.body.appendChild(fileLink)
                        fileLink.click()
                        fileLink.remove()
                      })
                    }
                    if (context.nameReports.length != 0) {
                      context.createReport(selectedDate).then((response) => {
                        const fileURL = window.URL.createObjectURL(new Blob([response.data]))
                        const fileLink = document.createElement('a')
                        fileLink.href = fileURL
                        fileLink.setAttribute('download', 'SIT_CC_report.zip')
                        document.body.appendChild(fileLink)
                        fileLink.click()
                        fileLink.remove()
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
