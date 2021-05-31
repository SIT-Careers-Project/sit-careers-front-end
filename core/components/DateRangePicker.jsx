import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { DateRangePicker, DateRangeDelimiter, LocalizationProvider } from '@material-ui/pickers'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'

const BasicDateRangePicker = (props) => {
  const { onClick, value } = props

  useEffect(() => {}, [value])

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DateRangePicker
        startText="เริ่มต้น"
        endText="สิ้นสุด"
        value={value}
        onChange={(date) => onClick(date)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  )
}
export default BasicDateRangePicker
