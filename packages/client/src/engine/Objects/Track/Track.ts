import { canvas } from '@/utils'
import CodeBustersEngine from '@/engine/Core/Core'
import BaseGameObject, {
  BaseGameObjectSpecs,
} from '@/engine/Objects/Base/BaseGameObject'

/*
 * @INFO Объект трассы
 *
 * Включает в себя описание отрисовки самой трассы
 *
 */

export type TrackObjectSpecs = BaseGameObjectSpecs

const INITIAL_SPECS = {
  x: 0,
  y: 0,
  width: 500,
  height: 0,
  fill: 'gray',
}

export default class TrackObject extends BaseGameObject<TrackObjectSpecs> {
  protected specs: TrackObjectSpecs = INITIAL_SPECS

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<TrackObjectSpecs> = {}
  ) {
    super(key, canvasApi, initialSpecs)

    this.specs.height = this.canvasApi.element.offsetHeight
  }

  public bindEngine = (engine: CodeBustersEngine) => {
    this.engine = engine
  }

  public drawTrack() {
    if (this.canvasApi.ctx && this.specs) {
      const specs = this.specs as TrackObjectSpecs

      this.canvasApi.element.width = specs.width
      this.canvasApi.element.height = specs.height

      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.fillStyle = specs.fill as string
      this.canvasApi.ctx.fillRect(specs.x, specs.y, specs.width, specs.height)
    }
  }

  public draw(specs?: Partial<TrackObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }
    }

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawTrack()
    }
  }
}