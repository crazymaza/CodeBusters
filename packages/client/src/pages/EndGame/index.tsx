import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/typedHooks'
import { logout } from '@/store/slices/authSlice/thunks'

const cx = classNames.bind(styles)

const EndGamePage = () => {
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
    <MainLayout>
      <div className={cx('endgame')}>
        <div className={cx('endgame__content')}>
          <Typography variant="h3" component="h3">
            Игра окончена!
          </Typography>
          <Typography variant="h5" component="h5">
            Ваш результат:
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            className={cx('endgame__content_result')}>
            100
          </Typography>
          <div className={cx('endgame__content-buttons')}>
            <Button
              onClick={routeToLeaderBoardHandler}
              variant="outlined"
              type="button">
              Таблица результатов
            </Button>
            <Button
              onClick={routeToPlayHandler}
              variant="contained"
              type="button">
              Начать снова
            </Button>
            <Button
              onClick={routeToMainMenuHandler}
              variant="outlined"
              type="button">
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default EndGamePage
