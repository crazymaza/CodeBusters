import BaseObject, { BaseObjectSpecs } from './Base'

export interface TrackObjectSpecs extends BaseObjectSpecs {
  borders?: BaseObjectSpecs
  leftField?: BaseObjectSpecs
  rightField?: BaseObjectSpecs
}

export default class TrackObject extends BaseObject<TrackObjectSpecs> {}
