import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const SignUpPage = () => {
  return (
    <MainLayout title="SignUp Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Зарегистрируйтесь</p>
      </div>
    </MainLayout>
  )
}

export default SignUpPage
