import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import { Grid, Typography, Button, TextFieldVariants } from '@mui/material'
import { TextField } from '@/components'

import { useAppDispatch } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import {
  getUserInfo,
  signin,
  oauthServiceFetch,
} from '@/store/slices/userSlice/thunks'
import { isAxiosError } from 'axios'

import { signInSchema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SigninData } from '@/api/User/types'

const cx = classNames.bind(styles)

const isDev = import.meta.env.MODE === 'development'
const oauthUrl = import.meta.env.VITE_OAUTH_URL
const redirectUri = isDev
  ? import.meta.env.VITE_OAUTH_REDIRECT_URL_DEV
  : import.meta.env.VITE_OAUTH_REDIRECT_URL_PROD

const SignIn = () => {
  const formFields: {
    name: 'login' | 'password'
    label: string
    variant?: TextFieldVariants | undefined
    type?: string
  }[] = [
    { label: 'Логин', name: 'login' },
    { label: 'Пароль', type: 'password', name: 'password' },
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<SigninData>({
    resolver: yupResolver(signInSchema),
    mode: 'all',
  })

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const redirectToOauthYandex = (serviceId: string) => {
    window.location.href = `${oauthUrl}?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUri}`
  }

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

  const onAuthYandex = async () => {
    try {
      const serviceId = await dispatch(oauthServiceFetch()).unwrap()

      redirectToOauthYandex(serviceId)
    } catch (error) {
      console.log('Error on OAuth fetch service id', error)
    }
  }

  return (
    <Grid
      component="form"
      className={cx('auth')}
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" component="h1" className={cx('auth__title')}>
        Вход
      </Typography>
      <Grid className={cx('auth__inputs')}>
        {formFields.map(
          ({ variant = 'standard', type = 'text', name, ...props }) => (
            <TextField
              key={name}
              labelClassName={cx('auth__inputs-textfield-label')}
              inputClassName={cx('auth__inputs-textfield-input')}
              control={control}
              fieldError={errors[name]}
              name={name}
              handleChange={ev => {
                setValue(name, ev.target.value)
              }}
              variant={variant}
              type={type}
              {...props}
            />
          )
        )}
      </Grid>

      <Link to={'/sign-up'} className={cx('auth__link')}>
        Создать аккаунт
      </Link>
      <Button variant="outlined" type="button" onClick={onAuthYandex}>
        Авторизоваться через Яндекс
      </Button>
      <Button variant="contained" type="submit">
        Авторизоваться
      </Button>
    </Grid>
  )
}

export default SignIn
