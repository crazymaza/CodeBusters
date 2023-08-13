import { useMemo } from 'react'
import { useAppDispatch } from '@/store/typedHooks'
import {
  oauthServiceFetch,
  oauthRedirect,
} from '@/store/slices/userSlice/thunks'
import {
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from '@mui/material'
import classNames from 'classnames/bind'
import styles from '@/pages/Home/styles.module.scss'

type YandexOAuthButtonProps = {
  isLoading: boolean
}

const cx = classNames.bind(styles)

const YandexOAuthButton: React.FC<YandexOAuthButtonProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch()

  const serviceIdLoader = useMemo(() => {
    return isLoading ? <CircularProgress /> : null
  }, [isLoading])

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
          {serviceIdLoader}
        </ListItemButton>
      </div>
    </ListItem>
  )
}

export default YandexOAuthButton
