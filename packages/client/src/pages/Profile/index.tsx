import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Avatar, Modal } from '@/components'
import { UserPageService } from '@/services'
import {
  Button,
  FormHelperText,
  IconButton,
  Switch,
  TextField,
  TextFieldVariants,
} from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Link, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { SyntheticEvent, useState } from 'react'

import { useAppDispatch } from '@/store/typedHooks'
import { logout } from '@/store/slices/authSlice/thunks'

import { schema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { UserRequest } from '@/api/User/types'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const formFields: {
    field:
      | 'login'
      | 'first_name'
      | 'second_name'
      | 'display_name'
      | 'email'
      | 'phone'
    label: string
    variant?: TextFieldVariants | undefined
    type?: string
  }[] = [
    { label: 'Логин', field: 'login' },
    { label: 'Имя', field: 'first_name' },
    { label: 'Фамилия', field: 'second_name' },
    { label: 'Полное имя', field: 'display_name' },
    { label: 'Email', type: 'email', field: 'email' },
    { label: 'Телефон', type: 'phone', field: 'phone' },
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
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const setNewPassword = (event: SyntheticEvent) => {
    const newPassword = (event.target as HTMLInputElement).value
    setPassword(previousState => {
      return { ...previousState, newPassword }
    })
  }

  const setOldPassword = (event: SyntheticEvent) => {
    const oldPassword = (event.target as HTMLInputElement).value
    setPassword(previousState => {
      return { ...previousState, oldPassword }
    })
  }

  const changeAvatar = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files ?? null
    if (files) UserPageService.changeUserAvatar(files)
  }

  const changePassword = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    UserPageService.changeUserPassword(
      password.oldPassword,
      password.newPassword
    ).then(() => {
      setOpen(false)
    })
  }

  const cancelClick = () => {
    navigate(-1)
  }

  const onSubmit = async (data: UserRequest) => {
    try {
      // TODO: определиться - через редакс или что-то еще
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const renderModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <form
          className={cx('modal-password__content')}
          onSubmit={changePassword}>
          <TextField
            label="Старый пароль"
            onChange={setOldPassword}
            variant="standard"
            type="password"
          />
          <TextField
            onChange={setNewPassword}
            label="Новый пароль"
            variant="standard"
            type="password"
          />
          <Button
            className={cx('modal-password__content_button')}
            variant="contained"
            type="submit">
            Сохранить
          </Button>
        </form>
      </Modal>
    )
  }

  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <MainLayout>
      <div className={cx('profile__page')}>
        <div className={cx('profile__page_content')}>
          <form
            className={cx('profile__page_form')}
            onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('profile__form_content')}>
              <div className={cx('form__content_settings')}>
                <Avatar changeAvatar={changeAvatar}></Avatar>
                <div className={cx('user__settings')}>
                  <div className={cx('user__settings_theme')}>
                    <span>Сменить тему</span>
                    <Switch defaultChecked />
                  </div>
                  <Link onClick={logoutHandler} to={'/sign-in'}>
                    Выйти из аккаунта
                  </Link>
                </div>
              </div>
              <div className={cx('form__content_inputlist')}>
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
                <Button
                  className={cx('form__content_inputlist_button')}
                  variant="contained"
                  type="button"
                  onClick={handleOpen}>
                  Изменить пароль
                </Button>
              </div>
              <div className={cx('form__content_close')}>
                <IconButton onClick={cancelClick}>
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </div>
            <div className={cx('profile__form_submit')}>
              <Button variant="contained" type="submit">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
      {renderModal()}
    </MainLayout>
  )
}

export default ProfilePage
