import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const HomePage = () => {
  return (
    <MainLayout title="Home Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Главная страница</p>
      </div>
    </MainLayout>
  )
}

export default HomePage
