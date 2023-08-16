import * as icons from './icons'
import classNames from 'classnames/bind'

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Link } from 'react-router-dom'
import styles from '@/pages/Home/styles.module.scss'

const cx = classNames.bind(styles)

const mainPageMenu: { label: string; to: string; picture: string }[] = [
  { label: 'Начать игру', to: 'play', picture: icons.Wheel },
  { label: 'Турнирная таблица', to: 'leader-board', picture: icons.Cup },
  { label: 'Форум игроков', to: 'forum', picture: icons.Forum },
  { label: 'Настройки аккаунта', to: 'profile', picture: icons.Gear },
]

const MainPageMenu = () => {
  return (
    <List>
      {mainPageMenu.map(({ label, to, picture }) => (
        <ListItem key={to} className={cx('menu__item')}>
          <Link to={to} className={cx('menu__item-link')}>
            <ListItemButton className={cx('link__button')}>
              <ListItemText
                primary={label}
                className={cx('link__button-label')}
              />
              <ListItemIcon className={cx('link__button-icon')}>
                <img src={picture} alt="иконка пункта меню" />
              </ListItemIcon>
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

export default MainPageMenu
