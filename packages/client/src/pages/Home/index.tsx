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
                <p align="center" className={cx('box__about_greeting')}>Добро пожаловать в Road Rider!</p>
                <p align="center" className={cx('box__about_description')}>Управляйте кнопками ←, → и ↓  Набирайте наибольшее число очков в гонке, обходите препятствия и не забывайте собирать топливо</p>
                <p align="center" className={cx('box__about_forum')}>Мы с нетерпением ждем ваших предложений по улучшению игры на нашем форуме</p>
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
