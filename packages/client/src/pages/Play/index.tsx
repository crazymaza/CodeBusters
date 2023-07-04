import { useRef, useEffect, memo } from 'react'
import { MainLayout } from '@/layouts'
import { TrackObject } from '@/engine/Objects'
import { CBEngine } from '@/engine'
import { canvas } from '@/utils'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const PlayPage = () => {
  const [level, setLevel] = useState(1)
  const [engine, setEngine] = useState<CBEngine | null>(null)
  const navigate = useNavigate()

  const containerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLCanvasElement>(null)

  const startGame = () => {
    setLevel(1)

    engine?.run()
  }

  const endGame = () => {
    engine?.stop()
  }

  const exitGame = () => {
    navigate('/')
  }

  useEffect(() => {
    if (
      trackRef.current instanceof HTMLCanvasElement &&
      containerRef.current instanceof HTMLElement
    ) {
      const trackCanvasLayer = canvas(trackRef.current)

      // Создаем объект трассы для движка с начальными характеристиками
      const trackObject = new TrackObject(trackCanvasLayer)
      const baseTrackSpecs = TrackObject.createBaseTrackSpecs(
        containerRef.current
      )

      // Рисуем трассу для начального отображения
      trackObject.draw(0, baseTrackSpecs)

      // Создаем экземпляр движка для обработки анимации игры
      setEngine(
        new CBEngine({
          objects: [trackObject],
        })
      )
    }
  }, [])

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
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(PlayPage)
