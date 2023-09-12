import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export interface EnemyObjectSpecs extends BaseGameObjectSpecs {
  positionX: number
  positionY: number
  positionWidth: number
  positionHeight: number
  image: CanvasImageSource | null
}
