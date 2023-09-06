import { BaseGameObjectSpecs } from '@/engine/Objects/Base/types'

export enum CarKeyboardControlEventKey {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}

export interface CarObjectSpecs extends BaseGameObjectSpecs {
  image: CanvasImageSource
  sensitivity?: number
}
