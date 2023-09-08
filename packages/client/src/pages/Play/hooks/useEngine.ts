import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store/typedHooks'
import { setGameScores, setGameProcess } from '@/store/slices/gameSlice'
import { loadImage } from '@/helpers'
import { canvas } from '@/utils'
import backgroundImage from 'sprites/background.png'
import spriteImages from 'sprites/sprites.png'
// import EndGameMessageObject from '@/engine/Objects/EndGame'

import { CodeBustersEngine } from '@/engine'
import {
  CarObject,
  TrackObject,
  CentralLinesObject,
  BordersSideObject,
  // BackgroundObject,
} from '@/engine/Objects'
import {
  EngineEvent,
  EngineProcess,
  EnginePlayerProgressType,
} from '@/engine/Core/types'

import {
  createTrack,
  createCar,
  createCentralLines,
  createBorders,
  createBackground,
} from './objects'

export type UseEngineProps = {
  backgroundRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLCanvasElement>
  linesRef: React.RefObject<HTMLCanvasElement>
  bordersRef: React.RefObject<HTMLCanvasElement>
  carRef: React.RefObject<HTMLCanvasElement>
  barrierRef: React.RefObject<HTMLCanvasElement>
  endGameMessageRef: React.RefObject<HTMLCanvasElement>
}

export default function useEngine(props: UseEngineProps) {
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
    // const isDefineLayers =
    //   // carRef.current instanceof HTMLCanvasElement &&
    //   trackRef.current instanceof HTMLCanvasElement &&
    //   linesRef.current instanceof HTMLCanvasElement &&
    //   bordersRef.current instanceof HTMLCanvasElement &&
    //   barrierRef.current instanceof HTMLCanvasElement &&
    //   backgroundRef.current instanceof HTMLCanvasElement &&
    //   containerRef.current instanceof HTMLElement &&
    //   endGameMessageRef.current instanceof HTMLElement

    // if (isDefineLayers) {
    // const trackCanvasLayer = canvas(trackRef.current)
    // const linesCanvasLayer = canvas(linesRef.current)
    // const bordersCanvasLayer = canvas(bordersRef.current)
    // // const carCanvasLayer = canvas(carRef.current)
    // const barrierCanvasLayer = canvas(barrierRef.current)
    // const backgroundLayer = canvas(backgroundRef.current)
    // const endGameMessageLayer = canvas(endGameMessageRef.current)

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

    // Создаем объект трассы для движка
    // const trackObject = new TrackObject('track', trackCanvasLayer)

    // // Создаем объект боковых границ трассы
    // const bordersSideObject = new BordersSideObject(
    //   'borders',
    //   bordersCanvasLayer
    // )

    // // Создаем объект центральной разметки трассы
    // const centralLinesObject = new CentralLinesObject(
    //   'central-lines',
    //   linesCanvasLayer
    // )

    // Создаем объект машины
    // const carObject = new CarObject('car', carCanvasLayer)

    // Создаем объект фона для движка
    // const backgroundObject = new BackgroundObject(
    //   'background',
    //   backgroundLayer
    // )

    // Рисуем фон
    // const bgImage = new Image()
    // bgImage.src = backgroundImage

    // backgroundObject.draw({
    //   x: 0,
    //   y: 0,
    //   image: bgImage,
    //   width: 1000,
    //   height: trackObject.getSpecs().height,
    // })

    // Рисуем трек
    // trackObject.draw()

    // Рисуем боковые границы
    // bordersSideObject.draw({
    //   width: trackObject.getSpecs().width,
    //   height: trackObject.getSpecs().height,
    // })

    // Рисуем центральную разметку
    // centralLinesObject.draw({
    //   width: trackObject.getSpecs().width,
    //   height: trackObject.getSpecs().height,
    // })

    // const loadEngine = async () => {
    // await loadImage(spriteImages)
    // await loadImage(backgroundImage)

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

    const trackObject = createTrack(props.trackRef.current as HTMLCanvasElement)

    const backgroundObject = createBackground(
      props.backgroundRef.current as HTMLCanvasElement,
      trackObject.getSpecs().height
    )

    const centralLinesObject = createCentralLines(
      props.linesRef.current as HTMLCanvasElement,
      trackObject.getSpecs().width,
      trackObject.getSpecs().height
    )

    const bordersSideObject = createBorders(
      props.bordersRef.current as HTMLCanvasElement,
      trackObject.getSpecs().width,
      trackObject.getSpecs().height
    )

    const carObject = createCar(
      props.carRef.current as HTMLCanvasElement,
      trackObject.getSpecs().width
    )

    const engine = new CodeBustersEngine()

    // Добавляем объекты игры
    engine
      .addObject(trackObject)
      .addObject(centralLinesObject)
      .addObject(bordersSideObject)
      .addObject(carObject)
      .addObject(backgroundObject)

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

    dispatch(setGameScores(0))

    return () => {
      engine?.destroy()
    }
  }, [])

  return engine
}
