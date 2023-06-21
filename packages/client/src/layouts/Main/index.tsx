import { FC } from 'react'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

export type MainLayoutProps = {
  title?: string
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const MainLayout: FC<MainLayoutProps> = ({ title, children }) => {
  return (
    <section className={cx('main-layout')}>
      {title && <h1 className={cx('main-layout__header')}>{title}</h1>}
      <div className={cx('main-layout__content')}>{children}</div>
    </section>
  )
}

export default MainLayout
