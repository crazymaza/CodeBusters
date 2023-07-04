import { useRef, useEffect, memo } from 'react'
import { MainLayout } from '@/layouts'
import { CarObject, TrackObject } from '@/engine/Objects'
import { CBEngine } from '@/engine'
import { canvas } from '@/utils'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import sportCarImage from 'images/sport_car.png'

const cx = classNames.bind(styles)

const PlayPage = () => {
  const [level, setLevel] = useState(1)
  const [engine, setEngine] = useState<CBEngine | null>(null)
  const navigate = useNavigate()

  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLCanvasElement>(null)
  const carRef = useRef<HTMLCanvasElement>(null)

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
      carRef.current instanceof HTMLCanvasElement &&
      trackRef.current instanceof HTMLCanvasElement &&
      containerRef.current instanceof HTMLElement
    ) {
      const carCanvasLayer = canvas(carRef.current)
      const trackCanvasLayer = canvas(trackRef.current)

      // Создаем объект машины для движка с начальными характеристиками
      const carObject = new CarObject(carCanvasLayer)
      const xPositionCar = carObject.getCenterOnTrack(TrackObject.width)
      const baseCarSpecs = CarObject.createBaseCarSpecs(
        sportCarImage,
        xPositionCar,
        0
      )

      // Создаем объект трассы для движка с начальными характеристиками
      const trackObject = new TrackObject(trackCanvasLayer)
      const baseTrackSpecs = TrackObject.createBaseTrackSpecs(
        containerRef.current
      )

      // Рисуем машину
      carObject.draw(0, baseCarSpecs)

      // Рисуем трассу для начального отображения
      trackObject.draw(0, baseTrackSpecs)

      // Создаем экземпляр движка для обработки анимации игры
      setEngine(
        new CBEngine({
          objects: [carObject, trackObject],
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
          <img src={sportCarImage} className={cx('play__car-current')} />
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

export default memo(PlayPage)
