import { useMemo } from 'react'
import { MainLayout } from '@/layouts'
import { useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { MainPageMenu, LogoutPageMenu } from './components'
import { MainStage } from '@/components'

import styles from './styles.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const HomePage: React.FC = () => {
  const user = useAppSelector(selectUserInfo)

  const menu = useMemo(() => {
    return user ? <MainPageMenu /> : <LogoutPageMenu />
  }, [user])

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
              <div className={cx('box__menu')}>{menu}</div>
            </div>
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default HomePage
