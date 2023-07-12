import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { useAppDispatch } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { signup } from '@/store/slices/authSlice/thunks'
import { Link } from 'react-router-dom'
import { Grid, Typography, Button, TextFieldVariants } from '@mui/material'
import { TextField } from '@/components'

import { signUpSchema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { SignupData } from '@/api/Auth/types'

const cx = classNames.bind(styles)

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formFields: {
    name:
      | 'login'
      | 'password'
      | 'first_name'
      | 'second_name'
      | 'email'
      | 'phone'
    label: string
    variant?: TextFieldVariants | undefined
    type?: string
  }[] = [
    { label: 'Логин', name: 'login' },
    { label: 'Пароль', type: 'password', name: 'password' },
    { label: 'Имя', name: 'first_name' },
    { label: 'Фамилия', name: 'second_name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Телефон', type: 'phone', name: 'phone' },
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  })

  const onSubmit = async (data: SignupData) => {
    try {
      await dispatch(signup(data)).unwrap()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid
      component="form"
      className={cx('auth')}
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" component="h1" className={cx('auth__title')}>
        Регистрация
      </Typography>
      <Grid className={cx('auth__inputs')}>
        {formFields.map(
          ({ variant = 'standard', type = 'text', name, ...props }) => (
            <TextField
              labelClassName={cx('auth__inputs-textfield__label')}
              inputClassName={cx('auth__inputs-textfield__input')}
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

      <Link to={'/sign-in'} className={cx('auth__link')}>
        Уже есть аккаунт
      </Link>
      <Button variant="contained" type="submit">
        Создать аккаунт
      </Button>
    </Grid>
  )
}

export default SignUp
