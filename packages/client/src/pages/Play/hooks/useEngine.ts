import { CodeBustersEngine } from '@/engine'
import { CarObject, TrackObject } from '@/engine/Objects'
import { loadImage } from '@/helpers'
import { canvas } from '@/utils'
import React, { useEffect, useState } from 'react'
import BackgroundObject from '@/engine/Objects/Background'
import BarrierObject from '@/engine/Objects/Barrier'
import backgroundImage from 'sprites/background.png'
import spriteImages from 'sprites/sprites.png'

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

      Promise.all([loadImage(spriteImages), loadImage(backgroundImage)]).then(
        () => {
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
              objects: [
                backgroundObject,
                trackObject,
                barrierObject,
                carObject,
              ],
            })
          )
        }
      )
    }
  });
  
  return engine
}
