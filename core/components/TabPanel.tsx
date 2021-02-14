import React from 'react'
import { Box, Typography } from '@material-ui/core'

export const TabPanel = (props) => {
  const { value, index, children } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={3} style={{ padding: '0px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
