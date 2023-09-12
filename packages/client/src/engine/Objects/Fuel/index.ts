import { canvas } from '@/utils'
import { getRandomInt } from '@/helpers'
import { CodeBustersEngine } from '@/engine'
import { BaseGameObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import { INITIAL_SPECS as INITIAL_SPECS_BORDERS } from '@/engine/Objects/BordersSide/const'
import {
  EngineEvent,
  EngineAnimateParams,
  EngineIntersection,
} from '@/engine/Core/types'
import { FuelObjectSpecs } from './types'

/*
 * @INFO Объект трассы
 *
 * Включает в себя описание отрисовки канистры с бензинов
 *
 */

export default class FuelObject extends BaseGameObject<FuelObjectSpecs> {
  private deltaTopOffset = 0
  private intervalId: NodeJS.Timer | null = null
  private xAxis: number | null = null
  private isFuelGet = false
  private isAllowDraw = false

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<FuelObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onStart = this.onStart.bind(this)
    this.onIntersection = this.onIntersection.bind(this)
    this.onAnimate = this.onAnimate.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    const params = this.engine.getParams()

    this.specs.capacity = params.gameParams.fuelCapacity

    this.engine
      .subscribe(EngineEvent.START, this.onStart)
      .subscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .subscribe(EngineEvent.ANIMATE, this.onAnimate)
      .subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.START, this.onStart)
      .unsubscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .unsubscribe(EngineEvent.ANIMATE, this.onAnimate)
      .unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onStart() {
    const params = this.engine?.getParams()

    this.intervalId = setInterval(() => {
      this.xAxis = null
      this.isFuelGet = false
      this.isAllowDraw = true

      this.specs.y = -this.specs.height
    }, params?.gameParams.fuelInterval)
  }

  private onIntersection(intersectionType: EngineIntersection) {
    const params = this.engine?.getParams()

    switch (intersectionType) {
      case EngineIntersection.FUEL:
        if (!this.isFuelGet) {
          this.engine?.setTimeLeft(
            (params?.playerProgress.timeLeft || 0) + this.specs.capacity
          )

          this.isFuelGet = true
        }

        break

      default:
        break
    }
  }

  private onAnimate(timestamp: number, params: EngineAnimateParams) {
    this.deltaTopOffset = params.playerProgress.speed

    if (this.xAxis === null) {
      const offset =
        INITIAL_SPECS_BORDERS.offsetSide * 2 + INITIAL_SPECS_BORDERS.widthLine

      this.xAxis = getRandomInt(
        offset,
        this.specs.trackWidth - offset - this.specs.width
      )
    }

    if (this.isFuelGet) {
      this.clear()
    } else if (this.isAllowDraw) {
      this.draw({
        x: this.xAxis,
        y: this.specs.y + this.deltaTopOffset,
      })
    }
  }

  protected onEnd() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.xAxis === null

    this.intervalId = null

    this.clear()
  }

  public drawFuel() {
    if (this.canvasApi.ctx && this.specs) {
      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.drawImage(
        this.specs.image as CanvasImageSource,
        this.specs.x,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )
    }
  }

  public draw(specs?: Partial<FuelObjectSpecs>) {
    this.specs = { ...this.specs, ...specs }

    if (this.isFirstDraw) {
      this.initialSpecs = this.specs

      this.isFirstDraw = false
    }

    if (this.specs.y > this.specs.trackHeight) {
      this.isAllowDraw = false
    }

    this.clear()
    this.drawFuel()
  }
}
