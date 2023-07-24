import ErrorLayout from '@/layouts/ErrorLayout'
import classNames from 'classnames/bind'
import ErrorCar from 'images/car_error_page.png'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)
const ErrorPage: React.FC<{ topMessage: string; bottomMessage?: string }> = ({
  topMessage,
  bottomMessage,
}) => {
  return (
    <ErrorLayout>
      <div className={cx('error')}>
        <img src={ErrorCar} alt="Ошибка" width={'50%'} height={'70%'} />
        <p>{topMessage}</p>
        <p>{bottomMessage}</p>
        <Link to="/" className={cx('error__button')}>
          Вернуться на главную
        </Link>
      </div>
    </ErrorLayout>
  )
}

export default ErrorPage
