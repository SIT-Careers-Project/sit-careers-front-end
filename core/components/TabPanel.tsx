import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const TabPanel = (props) => {
  const { value, index, children } = props
  const useStyles = makeStyles(() => ({
    tab: {
      '& .MuiBox-root': {
        padding: '0px'
      }
    }
  }))

  const classes = useStyles()

  return (
    <div
      className={classes.tab}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
