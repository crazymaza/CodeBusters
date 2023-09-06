import { canvas } from '@/utils'
import { BaseObjectSpecs } from './_types'

/*
 * @INFO Базовый объект
 *
 * Служит для описания общих характеристик объектов
 *
 */

export default abstract class BaseObject<TObjectSpecs extends BaseObjectSpecs> {
  protected canvasApi: ReturnType<typeof canvas>
  protected deltaTime = 0
  protected specs: TObjectSpecs | null = null

  constructor(canvasApi: ReturnType<typeof canvas>) {
    this.canvasApi = canvasApi
  }

  protected updateSpecs(
    newSpecs: Partial<TObjectSpecs>,
    callback?: (
      prevSpecs: TObjectSpecs,
      newSpecs: Partial<TObjectSpecs>
    ) => TObjectSpecs
  ) {
    if (this.specs && typeof callback === 'function') {
      callback(this.specs, newSpecs)

      return (this.specs = { ...this.specs, ...newSpecs })
    }
  }

  public draw(deltaTime: number, specs: TObjectSpecs) {
    this.deltaTime = deltaTime
    this.specs = specs
  }

  public getUniqSpecs(): Partial<TObjectSpecs> | null {
    return null
  }

  public getSpecs() {
    return this.specs
  }

  public clear() {
    this.canvasApi.ctx?.clearRect(
      0,
      0,
      this.canvasApi.element.width,
      this.canvasApi.element.height
    )
  }
}
