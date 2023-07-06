import BaseObject, { BaseObjectSpecs } from '@/engine/Objects/Base'

export type CBEngineOptions = {
  objects: BaseObject<BaseObjectSpecs>[]
}

export enum CBEngineProcess {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}
