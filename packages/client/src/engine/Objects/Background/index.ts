import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import BaseObject from '@/engine/Objects/Base'
import { INITIAL_SPECS } from './const'
import { EngineEvent, EngineAnimateParams } from '@/engine/Core/types'
import { BackgroundObjectSpecs } from './types'

export default class BackgroundObject extends BaseObject<BackgroundObjectSpecs> {
  private deltaTopOffset = 0

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<BackgroundObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onAnimate = this.onAnimate.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine
      .subscribe(EngineEvent.ANIMATE, this.onAnimate)
      .subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.ANIMATE, this.onAnimate)
      .unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onAnimate(timestamp: number, params: EngineAnimateParams) {
    this.deltaTopOffset = params.playerProgress.speed

    const axisY =
      this.specs.y > this.specs.trackHeight
        ? (this.initialSpecs.y || 0) * 2
        : this.specs.y + this.deltaTopOffset

    this.draw({
      y: axisY,
    })
  }

  public drawBackground() {
    if (this.canvasApi.ctx && this.specs) {
      this.canvasApi.ctx.beginPath()

      const xLeftAxis =
        this.canvasApi.element.width / 2 -
        this.specs.trackWidth / 2 -
        this.specs.width -
        20

      const xRightAxis =
        this.canvasApi.element.width / 2 + this.specs.trackWidth / 2

      this.canvasApi.ctx.drawImage(
        this.specs.imageLeft,
        xLeftAxis,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )

      this.canvasApi.ctx.drawImage(
        this.specs.imageRight,
        xRightAxis,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )
    }
  }

  public draw(specs?: Partial<BackgroundObjectSpecs>) {
    this.specs = { ...this.specs, ...specs }

    if (this.isFirstDraw) {
      this.initialSpecs = this.specs

      this.isFirstDraw = false
    }

    this.clear()
    this.drawBackground()
  }
}
