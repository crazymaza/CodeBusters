import { BaseObjectSpecs } from '@/engine/Objects/Base/types'

export interface CarObjectSpecs extends BaseObjectSpecs {
  image: CanvasImageSource
}

export enum CarKeyboadControlEventKey {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}
