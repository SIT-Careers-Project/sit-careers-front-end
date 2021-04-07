/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { Autocomplete as MaterialAutoComplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

type CoreAutoCompleteProps = {
  options: Array<string>
  keySearch: string
  keyName: string
  inputRef?: any
  className: string
  label: string
  error?: boolean
  helperText?: string
  defaultValue?: any
}

export const AutoComplete = (props: CoreAutoCompleteProps) => {
  const [value, setValue] = useState('')
  const [inputValue, setInputValue] = useState('')

  const {
    options,
    keySearch,
    inputRef,
    keyName,
    className,
    label,
    error,
    helperText,
    defaultValue
  } = props
  const ref = useRef(null)

  useEffect(() => {
    if (defaultValue) {
      const dataFilter = options.filter((data) => data[keyName] === defaultValue)
      setValue(dataFilter[0][keyName])
      setInputValue(dataFilter[0][keySearch])
    }
  }, [keySearch, keyName, defaultValue, options])

  return (
    <div className={className}>
      <MaterialAutoComplete
        options={options}
        ref={ref.current}
        includeInputInList={true}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue)
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            setValue(newValue[keyName])
            setInputValue(newValue[keySearch])
          }
        }}
        getOptionLabel={(option) => option[keySearch]}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            error={error}
            helperText={helperText}
            label={label}
          />
        )}
        freeSolo
      />
      <input className="hidden" name={keyName} value={value} ref={inputRef} />
    </div>
  )
}
