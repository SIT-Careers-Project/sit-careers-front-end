import { AddCircle, SettingsApplications } from '@material-ui/icons'
/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react'

import CoreTable from '../../../core/components/Table'
import { AlertContext } from 'core/contexts/alert_context'
import Link from 'next/link'
import { Observer } from 'mobx-react-lite'
import { companyTablePageContext } from '../contexts/company_table_page_context'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const CompanyTable = ({ authContext }) => {
  const context = useContext(companyTablePageContext)
  const alertContext = useContext(AlertContext)

  useEffect(() => {
    context.changeKey('alert', alertContext)
    if (authContext.roleUser === 'admin') {
      context.getCompaniesByAdmin()
    } else {
      context.getCompaniesByCompany()
    }
  }, [alertContext, authContext.roleUser, context])

  const column = [
    {
      title: 'บริษัท',
      field: 'company_name_th',
      render: function (rowData) {
        return (
          <>
            {rowData.logo === '-' ? (
              <div className="flex flex-row">
                <div className="flex flex-row items-center justify-center w-10 h-10 rounded-full bg-secondary1">
                  <span className="text-white text-heading-6">
                    {rowData.company_name_en.substr(0, 1)}
                  </span>
                </div>
                <div className="ml-5">
                  <p className="font-sarabun-samibold">{rowData.company_name_th}</p>
                  <p className="text-body-2 text-secondary2">{rowData.company_name_en}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-row">
                <img
                  alt="logo"
                  src={`${publicRuntimeConfig.s3_url}/logo/${rowData.logo}`}
                  style={{ width: '40px', borderRadius: '50%' }}
                />
                <div className="ml-5">
                  <p className="font-sarabun-samibold">{rowData.company_name_th}</p>
                  <p className="text-body-2 text-secondary2">{rowData.company_name_en}</p>
                </div>
              </div>
            )}
          </>
        )
      }
    },
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
          <SettingsApplications className="cursor-pointer text-secondary1" fontSize="large" />
        </Link>
      )
    }
  ]

  return (
    <div className="w-full h-auto max-w-screen-lg mb-16 bg-white">
      <div className="flex justify-between w-full mt-2">
        <div>
          <p className="text-heading-5 font-prompt">จัดการข้อมูลบริษัท</p>
        </div>
        <div>
          {authContext.roleUser === 'admin' && (
            <Link href="/company/form-create">
              <button className="bg-primary focus:outline-none">
                <p className="px-5 py-2 text-white font-prompt text-subtitle-1">
                  <AddCircle className="mr-1" />
                  เพิ่มบริษัท
                </p>
              </button>
            </Link>
          )}
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
                  data={context.companies}
                  getData={context.getCompaniesByAdmin}
                  options={{ search: true }}
                />
              )}
              {(authContext.roleUser === 'manager' || authContext.roleUser === 'coordinator') && (
                <CoreTable
                  column={column}
                  data={context.companies}
                  getData={context.getCompaniesByCompany}
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

export default CompanyTable
