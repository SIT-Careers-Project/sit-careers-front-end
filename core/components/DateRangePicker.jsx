import React from 'react'
import TextField from '@material-ui/core/TextField'
import { DateRangePicker, DateRangeDelimiter, LocalizationProvider } from '@material-ui/pickers'
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns'

const BasicDateRangePicker = () => {
  const [selectedDate, handleDateChange] = React.useState([null, null])

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
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
