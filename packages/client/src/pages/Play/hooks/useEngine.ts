import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { setGameScores, setGameProcess } from '@/store/slices/gameSlice'
import { CodeBustersEngine } from '@/engine'
import { CarObject, TrackObject } from '@/engine/Objects'
import { loadImage } from '@/helpers'
import { canvas } from '@/utils'
import BackgroundObject from '@/engine/Objects/Background'
import BarrierObject from '@/engine/Objects/Barrier'
import backgroundImage from 'sprites/background.png'
import spriteImages from 'sprites/sprites.png'
import { setLeaderboardData } from '@/store/slices/leaderboardSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import AvatarIcon from 'icons/stub_avatar.png'

export type UseEngineProps = {
  backgroundRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLCanvasElement>
  carRef: React.RefObject<HTMLCanvasElement>
  barrierRef: React.RefObject<HTMLCanvasElement>
}

export default function useEngine({
  backgroundRef,
  containerRef,
  trackRef,
  carRef,
  barrierRef,
}: UseEngineProps) {
  const [engine, setEngine] = useState<CodeBustersEngine | null>(null)
  const user = useAppSelector(selectUserInfo)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onChangeGameProcess = (engineInstance: CodeBustersEngine) => {
    const gameProcess = engineInstance?.getProcess()

    dispatch(setGameProcess(gameProcess))
  }

  const onAnimateEngine = (engineInstance: CodeBustersEngine) => {
    const scores = engineInstance?.getPlayerProgress().scores

    dispatch(setGameScores(scores))
  }

  const onEngineRun = () => {
    dispatch(setGameScores(0))
  }

  const onEngineStop = (engineInstance: CodeBustersEngine) => {
    const data = {
      nickname: user?.display_name,
      avatar: user?.avatar,
      codebustersScores: engineInstance?.getPlayerProgress().scores,
      userId: user?.id ?? 0,
    }
    dispatch(setLeaderboardData(data))
    navigate('/end-game')
  }

  useEffect(() => {
    const isDefineLayers =
      carRef.current instanceof HTMLCanvasElement &&
      trackRef.current instanceof HTMLCanvasElement &&
      barrierRef.current instanceof HTMLCanvasElement &&
      backgroundRef.current instanceof HTMLCanvasElement &&
      containerRef.current instanceof HTMLElement

    if (isDefineLayers) {
      const trackCanvasLayer = canvas(trackRef.current)
      const carCanvasLayer = canvas(carRef.current)
      const barrierCanvasLayer = canvas(barrierRef.current)
      const backgroundLayer = canvas(backgroundRef.current)

      const backgroundObject = new BackgroundObject(backgroundLayer)
      const baseBackgroundSpecs =
        BackgroundObject.createBaseBackgroundSpecs(backgroundImage)

      // Создаем объект трассы для движка с начальными характеристиками
      const trackObject = new TrackObject(trackCanvasLayer)
      const baseTrackSpecs = TrackObject.createBaseTrackSpecs(
        containerRef.current
      )

      // Создаем объект машины для движка с начальными характеристиками
      const carObject = new CarObject(carCanvasLayer)
      const xPositionCar = carObject.getCenterOnTrack(TrackObject.width)
      const baseCarSpecs = CarObject.createBaseCarSpecs(
        spriteImages,
        xPositionCar,
        0,
        trackRef.current.offsetHeight
      )

      // Создаём объект припятствий для движка с начальными характеристиками
      const barrierObject = new BarrierObject(barrierCanvasLayer)
      const baseBarrierSpecs = BarrierObject.createBaseBarrierSpecs(
        trackRef.current,
        spriteImages
      )

      const loadEngine = async () => {
        await loadImage(spriteImages)
        await loadImage(backgroundImage)

        // Рисуем фон
        backgroundObject.draw(0, baseBackgroundSpecs)
        // Рисуем трассу для начального отображения
        trackObject.draw(0, baseTrackSpecs)

        // Рисуем машину
        carObject.draw(0, baseCarSpecs)

        // Рисуем припятствия
        barrierObject.draw(0, baseBarrierSpecs)

        // Создаем экземпляр движка для обработки анимации и управлением процессом игры
        setEngine(
          new CodeBustersEngine({
            objects: [backgroundObject, trackObject, barrierObject, carObject],
            onChangeProcess: onChangeGameProcess,
            onAnimate: onAnimateEngine,
            onRun: onEngineRun,
            onStop: onEngineStop,
          })
        )
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
