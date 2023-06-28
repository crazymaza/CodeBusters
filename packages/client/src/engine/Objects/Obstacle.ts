import BaseObject, { BaseObjectSpecs } from './Base'

export interface ObstacleObjectSpecs extends BaseObjectSpecs {
  type: string
}

export default class ObstacleObject extends BaseObject<ObstacleObjectSpecs> {}
