import { canvas } from '@/utils'
import { getRandomInt } from '@/helpers'
import { CodeBustersEngine } from '@/engine'
import {
  EngineEvent,
  EngineAnimateParams,
  EngineIntersection,
} from '@/engine/Core/types'
import { BaseGameObject, TrackObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import { INITIAL_SPECS as INITIAL_SPECS_BORDERS } from '@/engine/Objects/BordersSide/const'
import { EnemyObjectSpecs } from './types'

/*
 * @INFO Объект машины
 *
 * Включает в себя описание отрисовки машины опонента на трассе
 *
 */

export default class EnemyObject extends BaseGameObject<EnemyObjectSpecs> {
  private deltaTopOffset = 0
  private intervalId: NodeJS.Timer | null = null
  private xAxis: number | null = null
  private isAllowDraw = false

  private trackObject: TrackObject | null = null

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<EnemyObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onStart = this.onStart.bind(this)
    this.onAnimate = this.onAnimate.bind(this)
    this.onIntersection = this.onIntersection.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)

    if (initialSpecs.image) {
      this.specs.image = initialSpecs.image
    }
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.trackObject = this.engine.getGameObject('track')

    this.engine
      .subscribe(EngineEvent.START, this.onStart)
      .subscribe(EngineEvent.ANIMATE, this.onAnimate)
      .subscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onStart() {
    const params = this.engine?.getParams()

    this.isAllowDraw = false

    this.clear()

    this.intervalId = setInterval(() => {
      if (
        this.specs.y <= this.trackObject!.getSpecs().height &&
        this.isAllowDraw
      ) {
        return
      }

      this.xAxis = null

      this.isAllowDraw = true

      this.specs.y = -this.specs.height
    }, params?.gameParams.enemyInterval)
  }

  private onAnimate(timestamp: number, params: EngineAnimateParams) {
    this.deltaTopOffset = params.playerProgress.speed

    const trackSpecs = this.trackObject?.getSpecs()

    const prevSpecs = this.specs

    if (this.xAxis === null) {
      const offset =
        INITIAL_SPECS_BORDERS.offsetSide * 2 + INITIAL_SPECS_BORDERS.widthLine

      this.xAxis = getRandomInt(
        offset,
        (trackSpecs?.width || 0) - offset - prevSpecs.positionWidth
      )
    }

    if (this.isAllowDraw) {
      this.draw({
        x: this.xAxis,
        y: prevSpecs.y + this.deltaTopOffset * params.gameParams.enemyDelta,
      })
    }
  }

  public drawEnemy() {
    if (this.canvasApi.ctx && this.specs) {
      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.drawImage(
        this.specs.image,
        this.specs.positionX,
        this.specs.positionY,
        this.specs.positionWidth,
        this.specs.positionHeight,
        this.specs.x,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )
    }
  }

  public draw(specs?: Partial<EnemyObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }

      if (this.isFirstDraw) {
        this.initialSpecs = this.specs

        this.isFirstDraw = false
      }

      if (this.specs.y > this.trackObject!.getSpecs().height) {
        this.isAllowDraw = false
      }
    }

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawEnemy()
    }
  }

  private onIntersection(intersectionType: EngineIntersection) {
    switch (intersectionType) {
      case EngineIntersection.ENEMY:
        this.engine?.end()

        break

      default:
        break
    }
  }

  protected onEnd() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    this.xAxis === null

    this.intervalId = null

    this.isAllowDraw = false

    this.specs = this.initialSpecs as EnemyObjectSpecs
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.START, this.onStart)
      .unsubscribe(EngineEvent.ANIMATE, this.onAnimate)
      .unsubscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }
}
