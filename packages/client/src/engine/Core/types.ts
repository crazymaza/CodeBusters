import BaseObject from '@/engine/Objects/Base'
import { BaseObjectSpecs } from '@/engine/Objects/Base/types'

export type CodeBustersEngineOptions<TEngine> = {
  objects: BaseObject<BaseObjectSpecs>[]
  onRun?: (instance: TEngine) => void
  onStop?: (instance: TEngine) => void
}

export enum CodeBustersEngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}
