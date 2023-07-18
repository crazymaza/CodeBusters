import { Typography } from '@mui/material'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import EndGameButtons from './EndGameButtons'

const cx = classNames.bind(styles)

const EndGameContent = () => {
  return (
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
      <EndGameButtons />
    </div>
  )
}

export default EndGameContent
