import BaseObject, { BaseObjectSpecs } from './Base'

export default class TrackObject extends BaseObject<BaseObjectSpecs> {
  protected draw(specs: Partial<BaseObjectSpecs>): BaseObjectSpecs {
    return this.updateSpecs(specs)
  }
}
