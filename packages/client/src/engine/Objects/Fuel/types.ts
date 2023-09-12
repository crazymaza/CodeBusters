import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export interface FuelObjectSpecs extends BaseGameObjectSpecs {
  image: CanvasImageSource | null
  trackWidth: number
  trackHeight: number
  capacity: number
}
