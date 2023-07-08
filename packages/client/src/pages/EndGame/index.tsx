import { MainLayout } from '@/layouts'
import { Button, Typography } from '@mui/material'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/typedHooks'
import { logout } from '@/store/slices/userSlice/thunks'
import { selectGameScores } from '@/store/slices/gameSlice/selectrors'
import { useAppSelector } from '@/store/typedHooks'
import styles from './styles.module.scss'
import { MainStage } from '@/components'

const cx = classNames.bind(styles)

const EndGamePage = () => {
  const scores = useAppSelector(selectGameScores)
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
        <div>
          <MainStage>
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
                {scores}
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
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default EndGamePage
