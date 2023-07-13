import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import { Grid, Typography, Button, TextFieldVariants } from '@mui/material'
import { TextField } from '@/components'

import { AuthLayout } from '@/layouts'
import { useAppDispatch } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, signin } from '@/store/slices/userSlice/thunks'
import { isAxiosError } from 'axios'

import { schema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SigninData } from '@/api/User/types'

const cx = classNames.bind(styles)

const SignInPage = () => {
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
  } = useForm<SigninData>({
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
            ({ variant = 'standard', type = 'text', name, ...props }) => (
              <TextField
                labelClassName={cx('signin__inputs-textfield-label')}
                inputClassName={cx('signin__inputs-textfield-input')}
                control={control}
                fieldError={errors[name]}
                name={name}
                variant={variant}
                type={type}
                {...props}
              />
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
