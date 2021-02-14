import MaterialTable from 'material-table'
import React from 'react'

const CoreTable = (props) => {
  const { column, data, options, editable, title, action } = props
  return (
    <MaterialTable
      title={title}
      columns={column}
      data={data}
      options={{
        showTitle: false,
        draggable: false,
        ...options
      }}
      editable={editable}
      actions={action}
    />
  )
}

export default CoreTable
