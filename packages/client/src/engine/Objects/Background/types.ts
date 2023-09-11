import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export interface BackgroundObjectSpecs extends BaseGameObjectSpecs {
  x: number
  y: number
  width: number
  height: number
  imageLeft: CanvasImageSource
  imageRight: CanvasImageSource
  trackWidth: number
  trackHeight: number
}
