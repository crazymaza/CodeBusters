import { useState, useEffect } from 'react'
import { CBEngine } from '@/engine'
import { TrackObject, CarObject, ObstacleObject } from '@/engine/Objects'
import {
  TrackObjectSpecs,
  CarObjectSpecs,
  ObstacleObjectSpecs,
} from '@/engine/Objects/types'

export default function useEngine(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  specs: {
    track: TrackObjectSpecs
    car: CarObjectSpecs
    obstacle: ObstacleObjectSpecs
  }
) {
  const [engine, setEngine] = useState<CBEngine | null>(null)

  useEffect(() => {
    const isDefineCanvasAndContext =
      canvasRef.current instanceof HTMLCanvasElement

    if (isDefineCanvasAndContext) {
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D

      const track = new TrackObject(ctx, specs.track)
      const car = new CarObject(ctx, specs.car)
      const obstacle = new ObstacleObject(ctx, specs.obstacle)

      setEngine(
        new CBEngine(canvasRef.current, {
          track,
          car,
          obstacle,
        })
      )
    }
  }, [canvasRef])

  return engine
}
