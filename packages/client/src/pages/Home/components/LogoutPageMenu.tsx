import { useAppDispatch } from '@/store/typedHooks'
import {
  oauthServiceFetch,
  oauthRedirect,
} from '@/store/slices/userSlice/thunks'
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
  const dispatch = useAppDispatch()

  const redirectToOauthYandexPage = (serviceId: string) => {
    setTimeout(() => {
      dispatch(oauthRedirect(serviceId))
    }, 200)
  }

  const onAuthYandex = async () => {
    try {
      const serviceId = await dispatch(oauthServiceFetch()).unwrap()

      redirectToOauthYandexPage(serviceId)
    } catch (error) {
      console.log('Error on OAuth fetch service id', error)
    }
  }

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
      <ListItem className={cx('menu__item')}>
        <div className={cx('menu__item-link')} onClick={onAuthYandex}>
          <ListItemButton className={cx('link__button')}>
            <ListItemText
              primary="Войти с Yandex ID"
              className={cx('link__button-label')}
            />
          </ListItemButton>
        </div>
      </ListItem>
    </List>
  )
}

export default LogoutPageMenu
