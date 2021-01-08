import { AddCircle, SettingsApplications } from '@material-ui/icons'
/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react'

import Link from 'next/link'
import MaterialTable from 'material-table'
import { Observer } from 'mobx-react-lite'
import { companyInfoPageContext } from '../contexts/company_info_page_context'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const CompanyTable = () => {
  const context = useContext(companyInfoPageContext)
  useEffect(() => {
    context.getCompanies()
  }, [])

  const column = [
    {
      title: 'Logo',
      field: 'logo',
      render: function (rowData) {
        return (
          <>
            {rowData.logo === '-' ? (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary1">
                <span className="text-white text-heading-6">
                  {rowData.company_name_en.substr(0, 1)}
                </span>
              </div>
            ) : (
              <img
                alt="logo"
                src={`${publicRuntimeConfig.s3_url}/logo/${rowData.logo}`}
                style={{ width: '40px', borderRadius: '50%' }}
              />
            )}
          </>
        )
      }
    },
    { title: 'บริษัท', field: 'company_name_en' },
    { title: 'ประเภทธุรกิจ', field: 'company_type' },
    {
      title: 'MOU',
      field: 'mou_link',
      render: (rowData) => {
        return <>{rowData.mou_link === '-' ? <span>ไม่มี</span> : <span>มี</span>}</>
      }
    },
    {
      title: 'ตั้งค่า',
      field: 'company_id',
      render: (rowData) => (
        <Link href={`/company/update/${rowData.company_id}`}>
          <SettingsApplications className="cursor-pointer text-secondary2" fontSize="large" />
        </Link>
      )
    }
  ]

  return (
    <Observer>
      {() => (
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
              data={context.companies}
              options={{
                showTitle: false
              }}
            />
          </div>
        </div>
      )}
    </Observer>
  )
}

export default CompanyTable
