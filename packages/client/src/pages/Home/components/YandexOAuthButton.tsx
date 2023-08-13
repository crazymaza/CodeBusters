import { useAppDispatch } from '@/store/typedHooks'
import {
  oauthServiceFetch,
  oauthRedirect,
} from '@/store/slices/userSlice/thunks'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import classNames from 'classnames/bind'
import styles from '@/pages/Home/styles.module.scss'

const cx = classNames.bind(styles)

const YandexOAuthButton = () => {
  const dispatch = useAppDispatch()

  const redirectToOauthYandexPage = (serviceId: string) => {
    dispatch(oauthRedirect(serviceId))
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
    <ListItem className={cx('menu__item')}>
      <div className={cx('menu__item-link')} onClick={onAuthYandex}>
        <ListItemButton className={cx('link__button')}>
          <ListItemText
            primary="Войти с Yandex.ID"
            className={cx('link__button-label')}
          />
        </ListItemButton>
      </div>
    </ListItem>
  )
}

export default YandexOAuthButton
