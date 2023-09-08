import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'
import { LineObject } from '@/engine/Objects'

export interface BordersSideObjectSpecs extends BaseGameObjectSpecs {
  countLines: number
  paddingLine: number
  heightLine: number
  widthLine: number
  roundLine: number
  offsetSide: number
  fillOdd: string
  fillEvent: string
}

export enum BordersSide {
  LEFT = 'border-left',
  RIGHT = 'border-right',
}

export type BordersItem = {
  left: {
    side: BordersSide
    line: LineObject
  }
  right: {
    side: BordersSide
    line: LineObject
  }
}
