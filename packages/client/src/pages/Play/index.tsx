import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const PlayPage = () => {
  return (
    <MainLayout title="Play Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница игры</p>
      </div>
    </MainLayout>
  )
}

export default PlayPage
