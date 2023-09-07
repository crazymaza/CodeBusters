import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store/typedHooks'
import { setGameScores, setGameProcess } from '@/store/slices/gameSlice'
import { loadImage } from '@/helpers'
import { canvas } from '@/utils'
// import BackgroundObject from '@/engine/Objects/Background'
// import BarrierObject from '@/engine/Objects/Barrier'
import backgroundImage from 'sprites/background.png'
import spriteImages from 'sprites/sprites.png'
// import EndGameMessageObject from '@/engine/Objects/EndGame'

import { CodeBustersEngine } from '@/engine'
import { CarObject, TrackObject, CentralLinesObject } from '@/engine/Objects'
import {
  EngineEvent,
  EngineProcess,
  EnginePlayerProgressType,
} from '@/engine/Core/types'

export type UseEngineProps = {
  backgroundRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLCanvasElement>
  linesRef: React.RefObject<HTMLCanvasElement>
  carRef: React.RefObject<HTMLCanvasElement>
  barrierRef: React.RefObject<HTMLCanvasElement>
  endGameMessageRef: React.RefObject<HTMLCanvasElement>
}

export default function useEngine({
  backgroundRef,
  containerRef,
  trackRef,
  linesRef,
  carRef,
  barrierRef,
  endGameMessageRef,
}: UseEngineProps) {
  const [engine, setEngine] = useState<CodeBustersEngine | null>(null)

  const dispatch = useAppDispatch()

  const onChangeGameProcess = (process: EngineProcess) => {
    dispatch(setGameProcess(process))
  }

  const onAnimateEngine = (
    timestamp: number,
    params: { playerProgress: EnginePlayerProgressType }
  ) => {
    dispatch(setGameScores(params.playerProgress.scores))
  }

  const onEngineStart = () => {
    dispatch(setGameScores(0))
  }

  useEffect(() => {
    const isDefineLayers =
      carRef.current instanceof HTMLCanvasElement &&
      trackRef.current instanceof HTMLCanvasElement &&
      linesRef.current instanceof HTMLCanvasElement &&
      barrierRef.current instanceof HTMLCanvasElement &&
      backgroundRef.current instanceof HTMLCanvasElement &&
      containerRef.current instanceof HTMLElement &&
      endGameMessageRef.current instanceof HTMLElement

    if (isDefineLayers) {
      const trackCanvasLayer = canvas(trackRef.current)
      const linesCanvasLayer = canvas(linesRef.current)
      const carCanvasLayer = canvas(carRef.current)
      const barrierCanvasLayer = canvas(barrierRef.current)
      const backgroundLayer = canvas(backgroundRef.current)
      const endGameMessageLayer = canvas(endGameMessageRef.current)

      // const backgroundObject = new BackgroundObject(backgroundLayer)
      // const baseBackgroundSpecs =
      //   BackgroundObject.createBaseBackgroundSpecs(backgroundImage)

      // Создаем объект трассы для движка с начальными характеристиками
      // const trackObject = new TrackObject(trackCanvasLayer)
      // const baseTrackSpecs = TrackObject.createBaseTrackSpecs(
      //   containerRef.current
      // )

      // Создаем объект машины для движка с начальными характеристиками
      // const carObject = new CarObject(carCanvasLayer)
      // const xPositionCar = carObject.getCenterOnTrack(TrackObject.width)
      // const baseCarSpecs = CarObject.createBaseCarSpecs(
      //   spriteImages,
      //   xPositionCar,
      //   0,
      //   trackRef.current.offsetHeight
      // )

      // Создаём объект припятствий для движка с начальными характеристиками
      // const barrierObject = new BarrierObject(barrierCanvasLayer)
      // const baseBarrierSpecs = BarrierObject.createBaseBarrierSpecs(
      //   trackRef.current,
      //   spriteImages
      // )

      // const endGameMessageObject = new EndGameMessageObject(endGameMessageLayer)
      // const endGameMessageSpecs =
      //   EndGameMessageObject.createBaseEndGameMessageSpecs(
      //     TrackObject.width,
      //     trackRef.current.offsetHeight
      //   )

      // Создаем объект трассы для движка с начальными характеристиками
      const trackObject = new TrackObject('track', trackCanvasLayer)

      // Создаем объект центральных линий с начальными характеристиками
      const centralLinesObject = new CentralLinesObject(
        'central-lines',
        linesCanvasLayer
      )

      // Создаем объект машины для движка с начальными характеристиками
      const carObject = new CarObject('car', carCanvasLayer)

      const loadEngine = async () => {
        await loadImage(spriteImages)
        await loadImage(backgroundImage)

        // Рисуем трек
        trackObject.draw()

        // Рисуем центральную разметку
        centralLinesObject.draw({
          width: trackObject.getSpecs().width,
          height: trackObject.getSpecs().height,
        })

        // Рисуем машину по центру трассы
        const carImage = new Image()
        const xAxisCar =
          trackObject.getSpecs().width / 2 - carObject.getSpecs().width / 2

        carImage.src = spriteImages

        setTimeout(() => {
          carObject.draw({
            image: carImage,
            x: xAxisCar,
          })
        }, 300)

        // Рисуем фон
        // backgroundObject.draw(0, baseBackgroundSpecs)
        // Рисуем трассу для начального отображения
        // trackObject.draw(0, baseTrackSpecs)

        // Рисуем припятствия
        // barrierObject.draw(0, baseBarrierSpecs)

        //
        // endGameMessageObject.draw(0, endGameMessageSpecs)

        // Создаем экземпляр движка для обработки анимации и управлением процессом игры
        // setEngine(
        //   new CodeBustersEngine({
        //     objects: [
        //       backgroundObject,
        //       trackObject,
        //       barrierObject,
        //       carObject,
        //       endGameMessageObject,
        //     ],
        //     onChangeProcess: onChangeGameProcess,
        //     onAnimate: onAnimateEngine,
        //     onRun: onEngineRun,
        //   })
        // )

        // Рисуем трассу для начального отображения
        // updatedTrackObject.draw()

        const engine = new CodeBustersEngine()

        // Добавляем объекты игры
        engine
          .addObject<TrackObject>(trackObject)
          .addObject<CentralLinesObject>(centralLinesObject)
          .addObject<CarObject>(carObject)

        // Подписываемся на события движка
        engine
          .subscribe({
            engineEvent: EngineEvent.START,
            callback: onEngineStart,
          })
          .subscribe({
            engineEvent: EngineEvent.CHANGE_PROCESS,
            callback: onChangeGameProcess,
          })
          .subscribe({
            engineEvent: EngineEvent.ANIMATE,
            callback: onAnimateEngine,
          })

        setEngine(engine)
      }

      dispatch(setGameScores(0))

      loadEngine()
    }

    return () => {
      engine?.destroy()
    }
  }, [])

  return engine
}
