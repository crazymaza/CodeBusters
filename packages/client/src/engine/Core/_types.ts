import BaseObject from '@/engine/Objects/Base'
import { BaseObjectSpecs } from '@/engine/Objects/Base/types'

export type EngineHandler<TEngine> = (instance: TEngine) => void

export type CodeBustersEngineOptions<TEngine> = {
  objects: BaseObject<BaseObjectSpecs>[]
  onRun?: EngineHandler<TEngine>
  onAnimate?: EngineHandler<TEngine>
  onStop?: EngineHandler<TEngine>
  onChangeProcess?: EngineHandler<TEngine>
}

export enum CodeBustersEngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
  FAILED = 'failed',
}

export type RunMethodOptions = {
  isResume?: boolean
}
