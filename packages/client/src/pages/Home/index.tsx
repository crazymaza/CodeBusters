import { MainStage } from '@/components'
import { MainLayout } from '@/layouts'

import { Paper } from '@mui/material'

import { useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'

import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import LogoutPageMenu from './components/LogoutPageMenu'
import MainPageMenu from './components/MainPageMenu'

const cx = classNames.bind(styles)

const HomePage: React.FC = () => {
  const user = useAppSelector(selectUserInfo)

  return (
    <MainLayout>
      <div className={cx('main__page')}>
        <Paper variant="outlined" className={cx('main__page_box')} square>
          <div className={cx('box__about')}>
            <p>Описание самой лучшей, классной игры</p>
            <p>Описание самой лучшей, классной игры</p>
            <p>Описание самой лучшей, классной игры</p>
          </div>
          <hr />
          <div className={cx('box__menu')}>
            {user ? (
              <MainPageMenu styles={styles} />
            ) : (
              <LogoutPageMenu styles={styles} />
            )}
          </div>
        </Paper>
      </div>
    </MainLayout>
  )
}

export default HomePage
