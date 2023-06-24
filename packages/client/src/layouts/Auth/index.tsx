import { FC } from 'react'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

export type AuthLayoutProps = {
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <section className={cx('auth-layout')}>{children}</section>
}

export default AuthLayout
