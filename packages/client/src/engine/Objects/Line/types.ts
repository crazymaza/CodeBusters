import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export interface LineObjectSpecs extends BaseGameObjectSpecs {
  stroke?: string
  round?: number | number[]
}
