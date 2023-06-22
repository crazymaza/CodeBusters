import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const NotFoundPage = () => {
  return (
    <MainLayout title="404">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Страница не найдена :(</p>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage
