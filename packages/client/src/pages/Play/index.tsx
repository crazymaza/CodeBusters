import { useRef } from 'react'
import { MainLayout } from '@/layouts'
import { useSession } from './hooks'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const PlayPage = () => {
  const [level, setLevel] = useState(10)
  const navigate = useNavigate()

  const restartGame = () => {
    setLevel(0)
  }

  const exitGame = () => {
    navigate('/')
  }

  return (
    <MainLayout>
      <div className={cx('play__page')}>
        <div className={cx('play__level')}>
          <span className={cx('level__number')}>{level}</span>
          <span>уровень</span>
        </div>
        <div className={cx('play__buttons')}>
          <Button variant="contained" onClick={restartGame}>
            Начать заново
          </Button>
          <Button variant="contained" onClick={exitGame}>
            Завершить игру
          </Button>
        </div>
        <canvas className={cx('play__canvas')}></canvas>
      </div>
    </MainLayout>
  )
}

export default PlayPage
