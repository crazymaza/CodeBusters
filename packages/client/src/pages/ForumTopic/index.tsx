import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const ForumTopicPage = () => {
  return (
    <MainLayout title="Topic Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница топика форума</p>
      </div>
    </MainLayout>
  )
}

export default ForumTopicPage
