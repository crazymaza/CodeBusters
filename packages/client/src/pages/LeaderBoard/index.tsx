import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const LeaderBoardPage = () => {
  return (
    <MainLayout title="LeaderBoard Page">
      <div className={cx('greeting')}>
        <p className={cx('greeting__message')}>Таблица результатов</p>
      </div>
    </MainLayout>
  )
}

export default LeaderBoardPage
