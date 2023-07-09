import { useEffect, useRef, useState } from 'react'
import { useEngine } from './hooks'
import { MainLayout } from '@/layouts'
import { CarObject, TrackObject } from '@/engine/Objects'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { makeContainerFullscreen } from '@/utils/fullscreen'

const cx = classNames.bind(styles)

const PlayPage = () => {
  const [level, setLevel] = useState(1)
  const navigate = useNavigate()

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLCanvasElement>(null)
  const carRef = useRef<HTMLCanvasElement>(null)

  const engine = useEngine({
    containerRef,
    trackRef,
    carRef,
  })

  useEffect(() => {
    const fullScreen = (event: KeyboardEvent) =>
      makeContainerFullscreen(event.key, document.body)
    document.body.addEventListener('keyup', fullScreen)
    return () => document.body.removeEventListener('keyup', fullScreen)
  }, [])

  const startGame = () => {
    setLevel(1)
    engine?.run()
  }

  const endGame = () => {
    engine?.stop()
  }

  const exitGame = () => {
    navigate('/')
    document.exitFullscreen()
  }

  return (
    <MainLayout>
      <div className={cx('play__page')}>
        <div className={cx('play__level')}>
          <span className={cx('level__number')}>{level}</span>
          <span>уровень</span>
        </div>
        <div className={cx('play__buttons')}>
          <Button variant="contained" onClick={startGame}>
            Начать игру
          </Button>
          <Button variant="contained" onClick={endGame}>
            Сбросить игру
          </Button>
          <Button variant="contained" onClick={exitGame}>
            Выйти в меню
          </Button>
        </div>
        <div ref={containerRef} className={cx('play__area')}>
          <canvas ref={trackRef} className={cx('play__track')} />
          <canvas
            ref={carRef}
            className={cx('play__car')}
            width={`${TrackObject.width}`}
            height={`${CarObject.dimensions.height}`}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default PlayPage
