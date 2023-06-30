import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
  TextFieldVariants,
} from '@mui/material'
import { AuthLayout } from '@/layouts'
import { useAppDispatch } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, signin } from '@/store/slices/authSlice/thunks'
import { isAxiosError } from 'axios'

import { schema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { SigninData } from '@/api/Auth/types'

const cx = classNames.bind(styles)

const SignInPage = () => {
  const formFields: {
    field: 'login' | 'password'

    label: string
    variant?: TextFieldVariants | undefined
    type?: string
  }[] = [
    { label: 'Логин', field: 'login' },
    { label: 'Пароль', type: 'text', field: 'password' },
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: SigninData) => {
    const signInData = {
      login: data.login,
      password: data.password,
    }

    try {
      await dispatch(signin(signInData)).unwrap()
      await dispatch(getUserInfo())
      navigate('/')
    } catch (error) {
      if (isAxiosError(error) && error.message === 'User already in system') {
        navigate('/')
      }
    }
  }

  return (
    <AuthLayout>
      <Grid
        component="form"
        className={cx('signin')}
        onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" component="h1" className={cx('signin__title')}>
          Вход
        </Typography>
        <Grid className={cx('signin__inputs')}>
          {formFields.map(
            ({ label, variant = 'standard', type = 'text', field }) => (
              <>
                <Controller
                  name={field}
                  control={control}
                  render={({ field: { onChange, ...props } }) => (
                    <TextField
                      {...props}
                      onChange={onChange}
                      // onFocus={onChange}
                      variant={variant}
                      label={label}
                      type={type}
                    />
                  )}
                />
                {errors[field] && (
                  <FormHelperText
                    sx={{ color: 'red' }}
                    required
                    id={field}
                    component="span">
                    {errors[field]?.message}
                  </FormHelperText>
                )}
              </>
            )
          )}
        </Grid>

        <Link to={'/sign-up'}>Создать аккаунт</Link>
        <Button variant="contained" type="submit">
          Авторизоваться
        </Button>
      </Grid>
    </AuthLayout>
  )
}

export default SignInPage
