import BaseObject, { BaseObjectSpecs } from './Base'

export interface ObstacleObjectSpecs extends BaseObjectSpecs {
  type: 'car' | 'oil' | 'border'
}

export default class ObstacleObject extends BaseObject<ObstacleObjectSpecs> {
  protected draw(
    delta: number,
    specs: Partial<ObstacleObjectSpecs>
  ): ObstacleObjectSpecs {
    if (this.canvasApi.ctx) {
      this.clear()
    }

    return this.updateSpecs(specs)
  }

  public getUniqSpecs(): Partial<ObstacleObjectSpecs> {
    return {
      type: this.specs.type,
    }
  }
}
