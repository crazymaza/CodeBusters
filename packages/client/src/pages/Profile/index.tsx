import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

import { useAppDispatch } from '@/store/typedHooks'
import { logout } from '@/store/slices/authSlice/thunks'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <MainLayout title="Profile Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница профиля</p>
        <button onClick={logoutHandler}>Выйти</button>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
