import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material'
import { AuthLayout } from '@/layouts'
import { useAppDispatch } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, signin } from '@/store/slices/authSlice/thunks'
import { isAxiosError } from 'axios'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { SigninData } from '@/api/Auth/types'

const cx = classNames.bind(styles)

const schema = yup.object().shape({
  login: yup
    .string()
    .required('Необходимое поле')
    .matches(
      /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
      'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'
    ),
  password: yup
    .string()
    .required('Необходимое поле')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d].{8,40}$/,
      'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра'
    ),
})

const SignInPage = () => {
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
          <Controller
            name="login"
            control={control}
            render={({ field: { onChange, ...props } }) => (
              <TextField
                {...props}
                onChange={onChange}
                onFocus={onChange}
                variant="standard"
                label="Логин"
              />
            )}
          />
          {errors.login && (
            <FormHelperText
              sx={{ color: 'red' }}
              required
              id="login"
              component="span">
              {errors.login.message}
            </FormHelperText>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, ...props } }) => (
              <TextField
                {...props}
                onChange={onChange}
                onFocus={onChange}
                variant="standard"
                label="Логин"
              />
            )}
          />
          {errors.password && (
            <FormHelperText
              sx={{ color: 'red' }}
              required
              id="password"
              component="span">
              {errors.password.message}
            </FormHelperText>
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
