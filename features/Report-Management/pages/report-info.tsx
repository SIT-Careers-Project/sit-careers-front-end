/* eslint-disable react/display-name */
import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import CoreTable from '../../../core/components/Table'
import { Observer } from 'mobx-react-lite'
import { TabPanel } from '../../../core/components/TabPanel'
import { GetApp } from '@material-ui/icons'
import BasicDateRangePicker from '../../../core/components/DateRangePicker'

const UserInfo = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue: number) => {
    setValue(newValue)
  }

  const selectData = [{ title: 'ข้อมูลทั้งหมด', field: 'summaryInfo' }]

  const data = [
    {
      summaryInfo: (
        <div>
          <p className="font-sarabun-meduim text-body-2">ข้อมูลบริษัท</p>
          <p className="text-body-2 text-secondary2 font-sarabun-light">
            ข้อมูลพื้นฐานทั้งหมดและ MOU ของบริษัท
          </p>
        </div>
      )
    },
    {
      summaryInfo: (
        <div>
          <p className="font-sarabun-meduim text-body-2">ข้อมูลประกาศรับสมัครงาน</p>
          <p className="text-body-2 text-secondary2 font-sarabun-light">
            ข้อมูลประกาศรับสมัครงานทั้งหมดที่แต่ละบริษัทประกาศ
          </p>
        </div>
      )
    },
    {
      summaryInfo: (
        <div>
          <p className="font-sarabun-meduim text-body-2">Dashboard</p>
          <p className="text-body-2 text-secondary2 font-sarabun-light">
            ข้อมูลสรุปผู้เข้าใช้งาน บริษัท และประกาศรับสมัครงานแต่ละประเภททั้งหมด
          </p>
        </div>
      )
    }
  ]

  const reportsColumn = [
    {
      title: 'สำเนาที่มี',
      field: 'report',
      render: () => (
        <div>
          <p className="font-sarabun-meduim text-body-2">01/01/2021 - 30/01/2021</p>
          <p className="text-body-2 text-secondary2 font-sarabun-light">ข้อมูลบริษัท, Dashboard</p>
        </div>
      )
    },
    {
      title: 'ดาวห์โหลด',
      field: 'download',
      render: () => <GetApp className="cursor-pointer text-secondary1" fontSize="large" />
    }
  ]

  const dataReport = [
    {
      report: 'report 1'
    }
  ]

  return (
    <div className="w-full max-w-screen-lg">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">ดาวห์โหลดรายงานสรุป</p>
        </div>
      </div>
      <div className="w-full h-1 mt-4 mb-6 bg-secondary1" />
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: '#295B8D' } }}>
          <Tab label="เลือกข้อมูล" className="font-prompt" />
          <Tab label="สำเนาที่มี" className="font-prompt" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Observer>
          {() => (
            <CoreTable
              title={
                <div className="flex flex-row pt-8 items-center">
                  <p className="font-sarabun-meduim text-body-2 pr-5">ช่วงเวลา:</p>
                  <BasicDateRangePicker />
                </div>
              }
              column={selectData}
              data={data}
              options={{
                selection: true,
                search: false,
                showTitle: true
              }}
              action={[
                {
                  tooltip: 'Export Data',
                  icon: 'get_app',
                  onClick: (event, data) => alert('You want to export ' + data.length + ' data')
                }
              ]}
            />
          )}
        </Observer>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Observer>{() => <CoreTable column={reportsColumn} data={dataReport} />}</Observer>
      </TabPanel>
    </div>
  )
}

export default UserInfo
