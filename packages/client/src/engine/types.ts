import { TrackObject, CarObject, ObstacleObject } from './Objects'

export type CBEngineObjects = {
  track: TrackObject
  car: CarObject
  obstacle: ObstacleObject
}

export type CBEngineOptions = {
  objects: CBEngineObjects
  canvasOptions?: CanvasRenderingContext2DSettings
}
