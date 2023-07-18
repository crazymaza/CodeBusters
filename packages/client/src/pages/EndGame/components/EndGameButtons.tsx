import Button from '@/components/Button'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const EndGameButtons = () => {
  const navigate = useNavigate()

  const routeToMainMenuHandler = () => {
    navigate('/')
  }

  const routeToPlayHandler = () => {
    navigate('/play')
  }

  const routeToLeaderBoardHandler = () => {
    navigate('/leader-board')
  }
  return (
    <div className={cx('endgame__content-buttons')}>
      <Button
        onClick={routeToLeaderBoardHandler}
        variant="outlined"
        type="button">
        Таблица результатов
      </Button>
      <Button onClick={routeToPlayHandler} variant="contained" type="button">
        Начать заново
      </Button>
      <Button onClick={routeToMainMenuHandler} variant="outlined" type="button">
        Выйти
      </Button>
    </div>
  )
}

export default EndGameButtons
