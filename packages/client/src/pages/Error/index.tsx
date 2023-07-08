import React from 'react'
import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import ErrorCar from 'images/car_error_page.png'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)
const ErrorPage: React.FC<{ topMessage: string; bottomMessage?: string }> = ({
  topMessage,
  bottomMessage,
}) => {
  return (
    <MainLayout>
      <div className={cx('error')}>
        <img src={ErrorCar} alt="Ошибка" width={'50%'} height={'70%'} />
        <p>{topMessage}</p>
        <p>{bottomMessage}</p>
        <Link to="/" className={cx('error__button')}>Вернуться на главную</Link>
      </div>
    </MainLayout>
  )
}

export default ErrorPage
