import BaseObject, { BaseObjectSpecs } from './Base'

export interface CarObjectSpecs extends BaseObjectSpecs {
  fuelCapacity: number
  fuel: number
  maxSpeed: number
  speed: number
  type: 'player' | 'enemy' | 'bonus'
  view: 'roadster' | 'sedan' | 'bolid' | 'refueler'
}

export default class CarObject extends BaseObject<CarObjectSpecs> {
  protected draw(
    delta: number,
    specs: Partial<CarObjectSpecs>
  ): CarObjectSpecs {
    if (this.canvasApi.ctx) {
      this.clear()
    }

    return this.updateSpecs(specs)
  }

  public getUniqSpecs(): Partial<CarObjectSpecs> {
    return {
      fuelCapacity: this.specs.fuelCapacity,
      fuel: this.specs.fuel,
      maxSpeed: this.specs.maxSpeed,
      speed: this.specs.speed,
      type: this.specs.type,
      view: this.specs.view,
    }
  }
}
