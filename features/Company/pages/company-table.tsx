/* eslint-disable react/display-name */
import React from 'react'
import MaterialTable from 'material-table'
import { AddCircle, SettingsApplications } from '@material-ui/icons'
import Link from 'next/link'

const CompanyTable = () => {
  const column = [
    {
      title: 'Logo',
      field: 'imageUrl',
      render: function (rowData) {
        return (
          <img alt="logo" src={rowData.imageUrl} style={{ width: '40px', borderRadius: '50%' }} />
        )
      }
    },
    { title: 'บริษัท', field: 'company' },
    { title: 'ประเภทธุรกิจ', field: 'company_type' },
    { title: 'MOU', field: 'MOU' },
    {
      title: 'ตั้งค่า',
      field: 'setting',
      render: () => (
        <Link href="/company/form-create">
          <SettingsApplications />
        </Link>
      )
    }
  ]

  return (
    <div className="w-full h-full max-w-screen-lg mb-16 bg-white">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">จัดการข้อมูลบริษัท</p>
        </div>
        <div>
          <Link href="/company/form-create">
            <button className="bg-primary">
              <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                <AddCircle className="mr-1" />
                เพิ่มบริษัท
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full h-1 mt-4 mb-3 bg-secondary1" />
      <div>
        <MaterialTable
          columns={column}
          data={[
            {
              company: 'SIT Company',
              company_type: 'Data Canter',
              MOU: 'มี',
              imageUrl: 'https://st.sit.kmutt.ac.th/wifi4st/SIT_logo.png'
            }
          ]}
          options={{
            showTitle: false
          }}
        />
      </div>
    </div>
  )
}

export default CompanyTable
