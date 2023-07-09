import { FC } from 'react'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

export type ErrorLayoutProps = {
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const ErrorLayout: FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <section className={cx('error-layout')}>
      <div className={cx('error-layout__content')}>{children}</div>
    </section>
  )
}

export default ErrorLayout
