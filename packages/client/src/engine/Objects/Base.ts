import { canvas } from '@/utils'

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
    protected canvasApi: ReturnType<typeof canvas>,
    protected specs: TObjectSpecs
  ) {
    this.draw(performance.now(), this.specs)

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

  protected abstract draw(
    deltaTime: number,
    specs?: Partial<TObjectSpecs>
  ): TObjectSpecs

  public getUniqSpecs(): Partial<TObjectSpecs> | null {
    return null
  }

  protected clear() {
    this.canvasApi.ctx?.clearRect(
      0,
      0,
      this.canvasApi.element.width,
      this.canvasApi.element.height
    )
  }
}
