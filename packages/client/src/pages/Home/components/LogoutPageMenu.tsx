import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'

const logoutMainPageMenu: { label: string; to: string }[] = [
  { label: 'Авторизоваться', to: '/sign-in' },
  { label: 'Создать аккаунт', to: '/sign-up' },
]

const LogoutPageMenu = ({ styles }: { styles: CSSModuleClasses }) => {
  const cx = classNames.bind(styles)
  return (
    <List>
      <Typography variant="h1">Добро пожаловать</Typography>
      {logoutMainPageMenu.map(({ label, to }) => (
        <ListItem key={to} className={cx('menu__item')}>
          <Link to={to} className={cx('menu__item_link')}>
            <ListItemButton className={cx('link__button')}>
              <ListItemText
                primary={label}
                className={cx('link__button_label')}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default LogoutPageMenu
