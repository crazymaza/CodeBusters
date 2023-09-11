import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export interface CentralLinesObjectSpecs extends BaseGameObjectSpecs {
  countLines: number
  paddingLine: number
  heightLine: number
  widthLine: number
}
