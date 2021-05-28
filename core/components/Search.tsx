import { InputAdornment, InputBase } from '@material-ui/core'

import React from 'react'
import { Search } from '@material-ui/icons'

const CoreSearch = (props) => {
  const { onChange } = props
  return (
    <InputBase
      placeholder="ค้นหาบริษัท"
      fullWidth={true}
      onChange={onChange}
      onKeyPress={props.onKeyPress}
      startAdornment={
        <InputAdornment position="start">
          <Search className="ml-4 mr-4 opacity-25 text-secondary2" />
        </InputAdornment>
      }
    />
  )
}

export default CoreSearch
