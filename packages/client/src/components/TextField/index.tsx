import {
  FormHelperText,
  TextField as MUITextField,
  TextFieldProps,
} from '@mui/material'

import styles from './styles.module.scss'
import classNames from 'classnames/bind'

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'
import { useState } from 'react'

type Props<T extends FieldValues> = {
  control: Control<T> | undefined
  fieldError: FieldError | undefined
  labelClassName?: string
  inputClassName?: string
  handleChange?: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
} & UseControllerProps<T> &
  TextFieldProps

const cx = classNames.bind(styles)

const TextField = <T extends FieldValues>({
  name,
  control,
  fieldError,
  labelClassName,
  inputClassName,
  handleChange,
  value,
  ...props
}: Props<T>) => {
  const [inputValue, setInputValue] = useState(value)

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MUITextField
            InputLabelProps={{
              className: labelClassName,
            }}
            InputProps={{
              className: inputClassName,
            }}
            {...field}
            {...props}
            onChange={ev => {
              setInputValue(ev.target.value)
              handleChange && handleChange(ev)
            }}
            value={inputValue}
          />
        )}
      />

      {fieldError && (
        <FormHelperText
          className={cx('error-message')}
          sx={{ color: 'red' }}
          required
          id={name}
          component="span">
          {fieldError.message}
        </FormHelperText>
      )}
    </>
  )
}

export default TextField
