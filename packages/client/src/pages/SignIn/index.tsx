import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'
import { AuthLayout } from '@/layouts'
import { useAppDispatch } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { getUserInfo, signin } from '@/store/slices/authSlice/thunks'
import { isAxiosError } from 'axios'

const cx = classNames.bind(styles)

const SignInPage = () => {
  // TODO: пока так, иная реализация будет при подключении react-hook-form
  const [login, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const submitLoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await dispatch(signin({ login, password })).unwrap()
      await dispatch(getUserInfo())
      navigate('/')
    } catch (error) {
      if (isAxiosError(error) && error.message === 'User already in system') {
        navigate('/')
      }
    }
  }

  const onChangeLoginHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <AuthLayout>
      <Grid
        component="form"
        className={cx('signin')}
        onSubmit={submitLoginHandler}>
        <Typography variant="h3" component="h1" className={cx('signin__title')}>
          Вход
        </Typography>
        <Grid className={cx('signin__inputs')}>
          <TextField
            label="Логин"
            variant="standard"
            onChange={onChangeLoginHandler}
          />
          <TextField
            label="Пароль"
            variant="standard"
            onChange={onChangePasswordHandler}
          />
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
