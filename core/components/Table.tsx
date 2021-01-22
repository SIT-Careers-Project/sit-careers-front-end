import MaterialTable from 'material-table'
import React from 'react'

const CoreTable = (props) => {
  const { column, data, options } = props
  return (
    <MaterialTable
      columns={column}
      data={data}
      options={{
        showTitle: false,
        draggable: false,
        ...options
      }}
    />
  )
}

export default CoreTable
