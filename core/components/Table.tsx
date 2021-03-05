/* eslint-disable react-hooks/exhaustive-deps */
import MaterialTable from 'material-table'
import React, { useCallback, useEffect } from 'react'

const CoreTable = (props) => {
  const { column, title, action, updateData, getData, dataTable } = props

  const fetchData = useCallback(async () => {
    await getData()
  }, [])

  useEffect(() => {
    const data = async () => {
      fetchData()
    }
    data()
  }, [column])

  const onRowUpdate = async (newData, oldData) => {
    if (oldData) {
      await updateData(newData)
        .then(() => {
          fetchData()
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert(error.response.data.message)
          } else {
            alert(error.response.data.message)
          }
        })
    }
  }

  return (
    <MaterialTable
      title={title}
      columns={column}
      data={dataTable}
      options={{
        actionsColumnIndex: -1,
        showTitle: false,
        draggable: false,
        ...props.options
      }}
      editable={{
        isEditable: () => props.isEditable,
        onRowUpdate: onRowUpdate
      }}
      actions={action}
    />
  )
}

export default CoreTable
