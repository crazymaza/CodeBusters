import BaseObject, { BaseObjectSpecs } from './Base'

export interface CarObjectSpecs extends BaseObjectSpecs {
  speed: number
}

export default class CarObject extends BaseObject<CarObjectSpecs> {}
