import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Avatar } from '@/components'
import { UserPageService } from '@/services'

const cx = classNames.bind(styles)

const ProfilePage = () => {
  const changeAvatar = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files ?? null
    if (files) UserPageService.changeUserAvatar(files)
  }

  return (
    <MainLayout title="Profile Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница профиля</p>
      </div>
      <div>
        <Avatar changeAvatar={changeAvatar}></Avatar>
      </div>
    </MainLayout>
  )
}

export default ProfilePage
