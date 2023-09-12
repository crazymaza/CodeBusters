import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export enum CarKeyboardControlEventKey {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
}

export enum CarKeyboardMove {
  LEFT = 'MoveLeft',
  RIGHT = 'MoveRight',
  CENTER = 'MoveCenter',
}

export interface CarObjectSpecs extends BaseGameObjectSpecs {
  positionX: number
  positionY: number
  positionWidth: number
  positionHeight: number
  sensitivity: number
  sensitivityMax: number
  sensitivityRatio: number
  deltaOffsetY: number
  layerHeight: number
  rotate: number
  bottomOffset: number
  image: CanvasImageSource | null
}
