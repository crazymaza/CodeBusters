import BaseObject from '@/engine/Objects/Base'
import { BaseObjectSpecs } from '../Objects/Base/types'

export type CodeBustersEngineOptions = {
  objects: BaseObject<BaseObjectSpecs>[]
}

export enum CodeBustersEngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}
