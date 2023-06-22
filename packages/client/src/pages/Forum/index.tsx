import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const ForumPage = () => {
  return (
    <MainLayout title="Forum Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница форума</p>
      </div>
    </MainLayout>
  )
}

export default ForumPage
