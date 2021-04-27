import React, { useContext } from 'react'
import AlertMaterial from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import { Close, CheckCircleOutline, InfoOutlined } from '@material-ui/icons'
import { Observer } from 'mobx-react-lite'
import { AlertContext } from '../contexts/alert_context'
import _ from 'lodash'

export const Alert = () => {
  const context = useContext(AlertContext)

  return (
    <Observer>
      {() => (
        <>
          {_.map(context.alert, (data, i) => {
            return (
              <div className="w-full max-w-screen-lg">
                <Collapse key={i} in={data.isOpen}>
                  <AlertMaterial
                    icon={
                      <>
                        {data.icon === 'success' && <CheckCircleOutline fontSize="inherit" />}
                        {(data.icon === 'info' || data.icon === 'error') && (
                          <InfoOutlined fontSize="inherit" />
                        )}
                      </>
                    }
                    severity={data.type}
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          data.isOpen = false
                        }}>
                        <Close fontSize="inherit" />
                      </IconButton>
                    }>
                    {data.message}
                  </AlertMaterial>
                </Collapse>
              </div>
            )
          })}
        </>
      )}
    </Observer>
  )
}
