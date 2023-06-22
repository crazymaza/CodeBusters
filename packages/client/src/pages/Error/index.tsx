import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const ErrorPage = () => {
  return (
    <MainLayout title="Упс, что-то пошло не так">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Уже фиксим...</p>
      </div>
    </MainLayout>
  )
}

export default ErrorPage
