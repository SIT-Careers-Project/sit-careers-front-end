/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'

import { Autocomplete as MaterialAutoComplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

type CoreAutoCompleteProps = {
  options: Array<string>
  keySearch: string
  keyName: string
  inputRef: any
  className: string
  label: string
  error: boolean
  helperText: string
}

export const AutoComplete = (props: CoreAutoCompleteProps) => {
  const [value, setValue] = React.useState('')
  const { options, keySearch, inputRef, keyName, className, label, error, helperText } = props

  const ref = useRef(null)

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [keySearch, keyName])

  return (
    <div className={className}>
      <MaterialAutoComplete
        options={options}
        ref={ref}
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue[keyName])
          }
        }}
        getOptionLabel={(option) => option[keySearch]}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={helperText}
            label={label}
            className="bg-grey-100"
          />
        )}
        freeSolo
      />
      <input className="hidden" name={keyName} value={value} ref={inputRef} />
    </div>
  )
}
