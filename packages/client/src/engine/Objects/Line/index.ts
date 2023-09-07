import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import { BaseGameObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
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
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine
  }

  public drawLine() {
    if (this.canvasApi.ctx && this.specs) {
      const specs = this.specs as LineObjectSpecs

      const ctx = this.canvasApi.ctx as CanvasRenderingContext2D

      ctx.beginPath()

      ctx.fillStyle = specs.fill as string

      // ctx.strokeRect(specs.x, specs.y, specs.width, specs.height)
      ctx.fillRect(specs.x, specs.y, specs.width, specs.height)
    }
  }

  public draw(specs?: Partial<LineObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }
    }

    if (this.canvasApi.ctx) {
      this.drawLine()
    }
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
