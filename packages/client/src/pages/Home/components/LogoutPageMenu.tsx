import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import YandexOAuthButton from './YandexOAuthButton'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from '@/pages/Home/styles.module.scss'

const cx = classNames.bind(styles)

const logoutMainPageMenu: { label: string; to: string }[] = [
  { label: 'Авторизоваться', to: '/sign-in' },
  { label: 'Создать аккаунт', to: '/sign-up' },
]

const LogoutPageMenu = () => {
  return (
    <List>
      <Typography variant="h1" className={cx('menu__title')}>
        Добро пожаловать
      </Typography>
      {logoutMainPageMenu.map(({ label, to }) => (
        <ListItem key={to} className={cx('menu__item')}>
          <Link to={to} className={cx('menu__item-link')}>
            <ListItemButton className={cx('link__button')}>
              <ListItemText
                primary={label}
                className={cx('link__button-label')}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
      <YandexOAuthButton />
    </List>
  )
}

export default LogoutPageMenu
