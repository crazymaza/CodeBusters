import BaseObject, { BaseObjectSpecs } from '@/engine/Objects/Base'

export type CodeBustersEngineOptions = {
  objects: BaseObject<BaseObjectSpecs>[]
}

export enum CodeBustersEngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}
