import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { AuthLayout } from '@/layouts'
import { Link } from 'react-router-dom'
import { Grid, Typography, TextField, Button } from '@mui/material'

const cx = classNames.bind(styles)

const SignUpPage = () => {
  return (
    <AuthLayout>
      <Grid component="form" className={cx('signup')}>
        <Typography variant="h3" component="h1" className={cx('signup__title')}>
          Регистрация
        </Typography>
        <Grid className={cx('signup__inputs')}>
          <TextField label="Имя" variant="standard" name="name" />
          <TextField label="Фамилия" variant="standard" name="second_name" />
          <TextField label="Email" variant="standard" name="email" />
          <TextField label="Телефон" variant="standard" name="phone" />
          <TextField label="Логин" variant="standard" name="login" />
          <TextField label="Пароль" variant="standard" name="password" />
        </Grid>

        <Link to={'/sign-in'}>Уже есть аккаунт</Link>
        <Button variant="contained">Создать аккаунт</Button>
      </Grid>
    </AuthLayout>
  )
}

export default SignUpPage
