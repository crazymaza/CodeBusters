import { canvas } from '@/utils'
import CodeBustersEngine from '@/engine/Core'
import { BaseGameObjectSpecs } from './types'

export type BaseGameObjectType = BaseGameObject<BaseGameObjectSpecs>

export default abstract class BaseGameObject<
  TGameObjectSpecs extends BaseGameObjectSpecs
> {
  protected engine: CodeBustersEngine | null = null
  protected canvasApi: ReturnType<typeof canvas>
  protected specs: TGameObjectSpecs = {} as TGameObjectSpecs

  public key = ''

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<TGameObjectSpecs> = {}
  ) {
    this.key = key
    this.canvasApi = canvasApi

    this.specs = {
      ...this.specs,
      ...(initialSpecs as TGameObjectSpecs),
    }
  }

  public abstract bindEngine(engine: CodeBustersEngine): void

  public draw(specs?: Partial<TGameObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs } as TGameObjectSpecs
    }
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
