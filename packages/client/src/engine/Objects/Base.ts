export interface BaseObjectSpecs {
  x: number
  y: number
  width: number
  height: number
  fill?: string
  type?: string
}

export default abstract class BaseObject<TObjectSpecs extends BaseObjectSpecs> {
  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected specs: TObjectSpecs
  ) {
    return this
  }

  protected updateSpecs(
    newSpecs: Partial<TObjectSpecs>,
    callback?: (
      prevSpecs: TObjectSpecs,
      newSpecs: Partial<TObjectSpecs>
    ) => TObjectSpecs
  ) {
    if (typeof callback === 'function') {
      callback(this.specs, newSpecs)
    }

    return (this.specs = { ...this.specs, ...newSpecs })
  }

  protected abstract draw(specs?: Partial<TObjectSpecs>): TObjectSpecs

  public getUniqSpecs(): Partial<TObjectSpecs> | null {
    return null
  }
}
