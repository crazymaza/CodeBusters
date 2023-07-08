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

type Props<T extends FieldValues> = {
  control: Control<T> | undefined
  fieldError: FieldError | undefined
} & UseControllerProps<T> &
  TextFieldProps

const cx = classNames.bind(styles)

const TextField = <T extends FieldValues>({
  name,
  control,
  fieldError,
  ...props
}: Props<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <MUITextField {...field} {...props} />}
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
