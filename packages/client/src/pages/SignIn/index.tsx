import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const SignInPage = () => {
  return (
    <MainLayout title="SignIn Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Авторизуйтесь</p>
      </div>
    </MainLayout>
  )
}

export default SignInPage
