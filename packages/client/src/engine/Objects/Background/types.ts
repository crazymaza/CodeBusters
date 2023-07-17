import { BaseObjectSpecs } from '../Base/types'

export interface BackgroundObjectSpecs extends BaseObjectSpecs {
  x: number
  y: number
  width: number
  height: number
  image: CanvasImageSource
}
