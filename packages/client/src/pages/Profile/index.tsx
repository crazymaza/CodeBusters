import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Avatar, Modal } from '@/components'
import { UserPageService } from '@/services'
import {
  Button,
  IconButton,
  Switch,
  TextField,
  TextFieldVariants,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { MainLayout } from '@/layouts'
import { SyntheticEvent, useState } from 'react'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const formFields: {
    label: string
    variant?: TextFieldVariants | undefined
    type?: string
  }[] = [
    { label: 'Логин' },
    { label: 'Имя' },
    { label: 'Фамилия' },
    { label: 'Email', type: 'email' },
    { label: 'Телефон', type: 'tel' },
  ]
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

  return (
    <MainLayout>
      <div className={cx('profile__page')}>
        <div className={cx('profile__page_content')}>
          <form
            className={cx('profile__page_form')}
            onSubmit={ev => console.log(ev)}>
            <div className={cx('profile__form_content')}>
              <div className={cx('form__content_settings')}>
                <Avatar changeAvatar={changeAvatar}></Avatar>
                <div className={cx('user__settings')}>
                  <div className={cx('user__settings_theme')}>
                    <span>Сменить тему</span>
                    <Switch defaultChecked />
                  </div>
                  <Link to={'/sign-in'}>Выйти из аккаунта</Link>
                </div>
              </div>
              <div className={cx('form__content_inputlist')}>
                {formFields.map(
                  ({ label, variant = 'standard', type = 'text' }) => (
                    <TextField
                      key={label}
                      label={label}
                      variant={variant}
                      type={type}
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
