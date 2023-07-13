import { BaseObjectSpecs } from '@/engine/Objects/Base/types'

export interface TrackObjectSpecs extends BaseObjectSpecs {
  boundaryCount?: number
}

export enum TrackBoundarySide {
  LEFT = 'left',
  RIGHT = 'right',
}
