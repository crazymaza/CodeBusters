import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Avatar, Modal } from '@/components'
import { UserPageService } from '@/services'
import { Button, IconButton, Switch, TextFieldVariants } from '@mui/material'
import { TextField } from '@/components'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Link, useNavigate } from 'react-router-dom'
import { MainLayout } from '@/layouts'
import { useState } from 'react'

import { useAppDispatch } from '@/store/typedHooks'
import { logout } from '@/store/slices/authSlice/thunks'

import { schema, modalSchema } from './validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { UserRequest } from '@/api/User/types'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const formFields: {
    name:
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
    { label: 'Логин', name: 'login' },
    { label: 'Имя', name: 'first_name' },
    { label: 'Фамилия', name: 'second_name' },
    { label: 'Полное имя', name: 'display_name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Телефон', type: 'phone', name: 'phone' },
  ]

  const modalFormFields: {
    name: 'oldPassword' | 'newPassword'
    label: string
    variant?: TextFieldVariants | undefined
    type?: string
  }[] = [
    { label: 'Старый пароль', name: 'oldPassword', type: 'password' },
    { label: 'Новый пароль', name: 'newPassword', type: 'password' },
  ]

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const {
    control: modalControl,
    formState: { errors: modalErrors },
    handleSubmit: modalHandleSubmit,
  } = useForm({
    resolver: yupResolver(modalSchema),
    mode: 'all',
  })

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const changeAvatar = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files ?? null
    if (files) UserPageService.changeUserAvatar(files)
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

  const onModalSubmit = async (data: {
    oldPassword: string
    newPassword: string
  }) => {
    await UserPageService.changeUserPassword(data.oldPassword, data.newPassword)
    setOpen(false)
  }

  const renderModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <form
          className={cx('modal-password__content')}
          onSubmit={modalHandleSubmit(onModalSubmit)}>
          {modalFormFields.map(
            ({ variant = 'standard', type = 'text', name, ...props }) => (
              <TextField
                control={modalControl}
                fieldError={modalErrors[name]}
                name={name}
                variant={variant}
                type={type}
                {...props}
              />
            )
          )}
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
                  ({ variant = 'standard', type = 'text', name, ...props }) => (
                    <TextField
                      control={control}
                      fieldError={errors[name]}
                      name={name}
                      variant={variant}
                      type={type}
                      {...props}
                    />
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
