import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export interface MessageObjectSpecs extends BaseGameObjectSpecs {
  header: string
  text: string
  fontColor: string
  strokeColor: string
  rectColor: string
  strokeWidth: number
  indent: number
  border: number
  lineSpacing: number
  textYAxisBegin: number
}
