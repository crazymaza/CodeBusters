import { canvas } from '@/utils'
import CodeBustersEngine from '@/engine/Core/Core'
import BaseGameObject, {
  BaseGameObjectSpecs,
} from '@/engine/Objects/Base/BaseGameObject'

/*
 * @INFO Объект линии трассы
 *
 * Включает в себя описание отрисовки линий для трассы
 *
 */

export type LineObjectSpecs = BaseGameObjectSpecs

const INITIAL_SPECS = {
  x: 0,
  y: 0,
  width: 10,
  height: 140,
  fill: '#fff',
}

export default class LineObject extends BaseGameObject<LineObjectSpecs> {
  protected specs: LineObjectSpecs = INITIAL_SPECS

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<LineObjectSpecs> = {}
  ) {
    super(key, canvasApi, initialSpecs)

    this.specs.height = this.canvasApi.element.offsetHeight
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

      ctx.strokeRect(specs.x, specs.y, specs.width, specs.height)
      ctx.fillRect(specs.x, specs.y, specs.width, specs.height)
    }
  }

  public draw(specs?: Partial<LineObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }
    }

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawLine()
    }
  }
}