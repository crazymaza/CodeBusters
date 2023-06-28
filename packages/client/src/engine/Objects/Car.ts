import BaseObject, { BaseObjectSpecs } from './Base'

export interface CarObjectSpecs extends BaseObjectSpecs {
  maxSpeed: number
  speed: number
  gear: 'low' | 'higth'
}

export default class CarObject extends BaseObject<CarObjectSpecs> {
  protected draw(specs: Partial<CarObjectSpecs>): CarObjectSpecs {
    return this.updateSpecs(specs)
  }

  public getUniqSpecs(): Partial<CarObjectSpecs> {
    return {
      maxSpeed: this.specs.maxSpeed,
      speed: this.specs.speed,
      gear: this.specs.gear,
    }
  }
}
