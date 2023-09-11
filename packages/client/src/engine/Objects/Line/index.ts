import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import { BaseGameObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import { EngineEvent } from '@/engine/Core/types'
import { LineObjectSpecs } from './types'

/*
 * @INFO Объект линии трассы
 *
 * Включает в себя описание отрисовки линий для трассы
 *
 */

export default class LineObject extends BaseGameObject<LineObjectSpecs> {
  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<LineObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine
      ?.subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  public drawLine() {
    const specs = this.specs as LineObjectSpecs

    const ctx = this.canvasApi.ctx

    if (ctx) {
      ctx.fillStyle = specs.fill as string
      ctx.strokeStyle = specs.stroke as string

      ctx.beginPath()

      const ctxForRound = ctx as any

      ctxForRound.roundRect(
        specs.x,
        specs.y,
        specs.width,
        specs.height,
        specs.round
      )
      ctx.stroke()
      ctx.fill()
    }
  }

  public draw(specs?: Partial<LineObjectSpecs>) {
    this.specs = { ...this.specs, ...specs }

    if (this.isFirstDraw) {
      this.initialSpecs = this.specs

      this.isFirstDraw = false
    }

    this.drawLine()
  }

  public clear() {
    this.canvasApi.ctx?.clearRect(
      this.specs.x,
      this.specs.y,
      this.specs.width,
      this.specs.height
    )
  }
}
