import { BaseObjectSpecs } from '@/engine/Objects/Base/types'

export interface TrackObjectSpecs extends BaseObjectSpecs {
  boundaryCount?: number
  linesCount?: number
}

export enum TrackBoundarySide {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TrackLineSide {
  LEFT = 'left',
  RIGHT = 'right',
}
