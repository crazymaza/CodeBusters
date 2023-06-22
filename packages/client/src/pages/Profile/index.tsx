import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  return (
    <MainLayout title="Profile Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница профиля</p>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
