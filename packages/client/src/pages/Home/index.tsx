import { MainLayout } from '@/layouts'
import { Paper } from '@mui/material'
import { useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'

import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import LogoutPageMenu from './components/LogoutPageMenu'
import MainPageMenu from './components/MainPageMenu'
import { MainStage } from '@/components'

const cx = classNames.bind(styles)

const HomePage: React.FC = () => {
  const user = useAppSelector(selectUserInfo)

  return (
    <MainLayout>
      <div className={cx('main__page')}>
        <div className={cx('main__page_box')}>
          <MainStage>
            <div className={cx('main__page_box-container')}>
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
            </div>
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
