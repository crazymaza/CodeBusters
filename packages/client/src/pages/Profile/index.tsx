import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Avatar, Modal } from '@/components'
import { UserPageService } from '@/services'
import { Box, Button, IconButton, Switch, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { MainLayout } from '@/layouts'
import { useState } from 'react'

const cx = classNames.bind(styles)

const ProfilePage = () => {
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

  const renderModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <div className={cx('modal-password__content')}>
          <TextField label="Пароль" variant="standard" type="password" />
          <TextField
            label="Подтверждение пароля"
            variant="standard"
            type="password"
          />
          <Button
            className={cx('modal-password__content_button')}
            variant="contained"
            type="submit">
            Сохранить
          </Button>
        </div>
      </Modal>
    )
  }

  return (
    <MainLayout>
      <div className={cx('profile__page')}>
        <div className={cx('profile__page_content')}>
          <form className={cx('profile__page_form')}>
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
                <TextField label="Логин" variant="standard" />
                <TextField label="Имя" variant="standard" />
                <TextField label="Фамилия" variant="standard" />
                <TextField label="Email" variant="standard" type="email" />
                <TextField label="Телефон" variant="standard" type="tel" />
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
