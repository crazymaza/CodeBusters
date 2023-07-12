import { useState, useEffect } from 'react'
import { CodeBustersEngine } from '@/engine'
import { CarObject, TrackObject } from '@/engine/Objects'
import { canvas } from '@/utils'
import { loadImage } from '@/helpers'

import sportCarImage from 'images/sport_car.png'

export type UseEngineProps = {
  containerRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLCanvasElement>
  carRef: React.RefObject<HTMLCanvasElement>
}

export default function useEngine({
  containerRef,
  trackRef,
  carRef,
}: UseEngineProps) {
  const [engine, setEngine] = useState<CodeBustersEngine | null>(null)

  useEffect(() => {
    const isDefineLayers =
      carRef.current instanceof HTMLCanvasElement &&
      trackRef.current instanceof HTMLCanvasElement &&
      containerRef.current instanceof HTMLElement

    if (isDefineLayers) {
      const trackCanvasLayer = canvas(trackRef.current)
      const carCanvasLayer = canvas(carRef.current)

      // Создаем объект трассы для движка с начальными характеристиками
      const trackObject = new TrackObject(trackCanvasLayer)
      const baseTrackSpecs = TrackObject.createBaseTrackSpecs(
        containerRef.current
      )

      // Создаем объект машины для движка с начальными характеристиками
      const carObject = new CarObject(carCanvasLayer)
      const xPositionCar = carObject.getCenterOnTrack(TrackObject.width)

      const baseCarSpecs = CarObject.createBaseCarSpecs(
        sportCarImage,
        xPositionCar,
        0
      )

      // Ждем пока загрузиться изображение машины
      loadImage(sportCarImage).then(() => {
        // Рисуем трассу для начального отображения
        trackObject.draw(0, baseTrackSpecs)

        // Рисуем машину
        carObject.draw(0, baseCarSpecs)

        // Создаем экземпляр движка для обработки анимации и управлением процессом игры
        setEngine(
          new CodeBustersEngine({
            objects: [trackObject, carObject],
          })
        )
      })
    }
  }, [])

  return engine
}
