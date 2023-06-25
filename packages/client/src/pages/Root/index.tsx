import { Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const RootContainer = () => {
  return (
    <section className={cx('root-section')}>
      <div className={cx('root-section__outlet')}>
        <Outlet />
      </div>
    </section>
  )
}

export default RootContainer
