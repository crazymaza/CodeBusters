import { Avatar, Dialog, TextField } from '@/components'
import { MainLayout } from '@/layouts'
import { UserPageService } from '@/services'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Button, IconButton, Switch, TextFieldVariants } from '@mui/material'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { changeUserInfo, logout } from '@/store/slices/userSlice/thunks'

import { UserRequest } from '@/api/User/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  changeUserPassword,
  changeUserAvatar,
} from '@/store/slices/userSlice/thunks'
import { UserUpdateModel, UserInfo } from '@/api/User/types'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const user = useAppSelector(selectUserInfo)

  const defaultValues = {
    first_name: user?.first_name || '',
    second_name: user?.second_name || '',
    display_name: user?.display_name || '',
    login: user?.login || '',
    email: user?.email || '',
    phone: user?.phone || '',
  }
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
    value?: string | number
  }[] = [
    { label: 'Логин', name: 'login', value: defaultValues.login },
    { label: 'Имя', name: 'first_name', value: defaultValues.first_name },
    { label: 'Фамилия', name: 'second_name', value: defaultValues.second_name },
    {
      label: 'Полное имя',
      name: 'display_name',
      value: defaultValues.display_name,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: defaultValues.email,
    },
    {
      label: 'Телефон',
      type: 'phone',
      name: 'phone',
      value: defaultValues.phone,
    },
  ]

  const dialogFormFields: {
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
    setValue,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const {
    control: modalControl,
    formState: { errors: modalErrors },
    handleSubmit: dialogHandleSubmit,
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
    if (files) dispatch(changeUserAvatar(files))
  }

  const cancelClick = () => {
    navigate('/')
  }

  const onSubmit = async (data: UserUpdateModel) => {
    try {
      await dispatch(changeUserInfo(data)).unwrap()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const onDialogSubmit = async (data: {
    oldPassword: string
    newPassword: string
  }) => {
    dispatch(changeUserPassword(data))
    setOpen(false)
  }

  const renderDialog = () => {
    const {
      control: modalControl,
      formState: { errors: modalErrors },
      handleSubmit: modalHandleSubmit,
      setValue,
    } = useForm({
      resolver: yupResolver(modalSchema),
      mode: 'onSubmit',
    })

    return (
      <Dialog open={open} title="Смена пароля" onClose={handleClose}>
        <form
          className={cx('dialog-password__content')}
          onSubmit={dialogHandleSubmit(onDialogSubmit)}>
          {dialogFormFields.map(
            (
              { variant = 'standard', type = 'text', name, ...props },
              index
            ) => (
              <TextField
                key={index}
                control={modalControl}
                fieldError={modalErrors[name]}
                name={name}
                variant={variant}
                type={type}
                handleChange={ev => {
                  setValue(name, ev.target.value)
                }}
                {...props}
              />
            )
          )}
          <Button
            className={cx('dialog-password__content_button')}
            variant="contained"
            type="submit">
            Сохранить
          </Button>
        </form>
      </Dialog>
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
                <Avatar src={user?.avatar} changeAvatar={changeAvatar}></Avatar>
                <div className={cx('user__settings')}>
                  <div className={cx('user__settings_theme')}>
                    <span>Сменить тему</span>
                    <Switch defaultChecked />
                  </div>
                  <Link onClick={logoutHandler} to={'/'}>
                    Выйти из аккаунта
                  </Link>
                </div>
              </div>
              <div className={cx('form__content_inputlist')}>
                {formFields.map(
                  ({
                    variant = 'standard',
                    type = 'text',
                    value = '',
                    name,
                    ...props
                  }) => {
                    return (
                      <TextField
                        control={control}
                        fieldError={errors[name]}
                        name={name}
                        variant={variant}
                        value={value}
                        handleChange={ev => {
                          setValue(name, ev.target.value)
                        }}
                        type={type}
                        {...props}
                      />
                    )
                  }
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
      {renderDialog()}
    </MainLayout>
  )
}

export default ProfilePage
