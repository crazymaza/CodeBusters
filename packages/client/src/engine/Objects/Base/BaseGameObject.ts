import EventBus from '@/engine/EventBus'
import { canvas } from '@/utils'

export type BaseGameObjectEvent = string

export interface BaseGameObjectSpecs {
  x: number
  y: number
  width: number
  height: number
  fill?: string
  type?: string
}

export default abstract class BaseGameObject<
  TGameObjectSpecs extends BaseGameObjectSpecs,
  TGameObjectEvent extends BaseGameObjectEvent
> extends EventBus<TGameObjectEvent> {
  protected canvasApi: ReturnType<typeof canvas>
  protected specs: TGameObjectSpecs | null = null

  constructor(canvasApi: ReturnType<typeof canvas>) {
    super()

    this.canvasApi = canvasApi
  }

  public draw(specs: TGameObjectSpecs) {
    this.specs = specs
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
