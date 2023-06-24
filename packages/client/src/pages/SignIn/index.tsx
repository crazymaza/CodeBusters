import { AuthLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'

const cx = classNames.bind(styles)

// TODO: пока без логики

const SignInPage = () => {
  return (
    <AuthLayout>
      <Grid className={cx('signin')}>
        <Typography variant="h3" component="h1" className={cx('signin__title')}>
          Вход
        </Typography>
        <Grid className={cx('signin__inputs')}>
          <TextField label="Логин" variant="standard" />
          <TextField label="Пароль" variant="standard" />
        </Grid>
        <Grid item className={cx('signin__buttons')}>
          <Link to={'/sign-up'}>Создать аккаунт</Link>
          <Button variant="contained">Авторизоваться</Button>
        </Grid>
      </Grid>
    </AuthLayout>
  )
}

export default SignInPage