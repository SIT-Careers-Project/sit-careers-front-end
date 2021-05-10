/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react'
import CoreTable from '../../../core/components/Table'
import { Observer } from 'mobx-react-lite'
import BasicDateRangePicker from '../../../core/components/DateRangePicker'
import { reportInfoPageContext } from '../context/report_info_page_context'
import { selectData, data } from '../services/constantVariable'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import JSZip from 'jszip'

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
                    // const link = document.createElement('a')
                    // link.target = '_blank'
                    // link.download = 'SITCareerCenter'
                    context
                      .createReport(selectedDate)
                      //  .then((res) => {
                      // link.href = URL.createObjectURL(new Blob([data], { type: 'zip' }))
                      //   link.click()
                      // })
                      .then(({ data }) => {
                        // const zip = new JSZip()
                        // zip.loadAsync(data)
                        // zip.generateAsync({ type: 'blob' }).then(function (content) {
                        //   // see FileSaver.js
                        //   saveAs(new Blob([data], { type: 'zip' }), content, 'poytest.zip')
                        // })
                        // const file = new Blob([data], { type: 'application/zip' })
                        // saveAs(file, 'dcdiacnislajails.zip')
                        // link.click()
                        const zip = new JSZip()
                        // const folder = zip.folder('collection')
                        // folder.file(`araigordai.xlsx`, data)
                        // folder
                        //   .generateAsync({ type: 'blob' })
                        //   .then((content) => saveAs(content, 'hello'))
                        zip.folder('testkub').file(data)
                        zip.generateAsync({ type: 'base64' }).then(function (base64) {
                          window.location.href = 'data:application/zip;base64,' + base64
                        })
                        console.log(typeof data)
                      })
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
