/* eslint-disable react-hooks/exhaustive-deps */
import MaterialTable from 'material-table'
import React, { useCallback, useEffect } from 'react'
import { tableIcons } from './IconTable'

const CoreTable = (props) => {
  const { column, title, action, getData, data } = props

  const fetchData = useCallback(async () => {
    await getData()
  }, [])

  useEffect(() => {
    const data = async () => {
      fetchData()
    }
    data()
  }, [column])

  return (
    <MaterialTable
      icons={tableIcons}
      title={title || ''}
      columns={column}
      data={data}
      options={{
        actionsColumnIndex: -1,
        showTitle: false,
        draggable: false,
        ...props?.options
      }}
      actions={action}
      {...props}
    />
  )
}

export default CoreTable
