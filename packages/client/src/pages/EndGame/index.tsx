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
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  const playHandler = () => {
    navigate('/play')
  }

  return (
    <MainLayout>
      <div className={cx('endgame__page')}>
        <div className={cx('endgame__page_content')}>
          <div className={cx('endgame__content_title')}>
            <Typography variant="h3" component="h1">
              Игра окончена!
            </Typography>
          </div>
          <div className={cx('endgame__content_body')}>
            <Typography variant="h5" component="h1">
              Ваш результат:
            </Typography>
            <Typography
              variant="h1"
              component="h1"
              className={cx('endgame__page_content_result')}>
              100
            </Typography>
          </div>
          <div className={cx('endgame__content_buttons')}>
            <Button onClick={playHandler} variant="contained" type="button">
              Начать снова
            </Button>
            <Button onClick={logoutHandler} variant="outlined" type="button">
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default EndGamePage
