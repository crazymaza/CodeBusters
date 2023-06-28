import BaseObject, { BaseObjectSpecs } from './Base'

export interface ObstacleObjectSpecs extends BaseObjectSpecs {
  type: 'oil' | 'border'
}

export default class ObstacleObject extends BaseObject<ObstacleObjectSpecs> {
  protected draw(specs: Partial<ObstacleObjectSpecs>): ObstacleObjectSpecs {
    return this.updateSpecs(specs)
  }

  public getUniqSpecs(): Partial<ObstacleObjectSpecs> {
    return {
      type: this.specs.type,
    }
  }
}
