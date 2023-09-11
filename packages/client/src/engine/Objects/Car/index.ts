import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import { EngineEvent, EngineIntersection } from '@/engine/Core/types'
import {
  BaseGameObject,
  TrackObject,
  EnemyObject,
  FuelObject,
  BordersSideObject,
} from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import {
  CarObjectSpecs,
  CarKeyboardControlEventKey,
  CarKeyboardMove,
} from './types'

/*
 * @INFO Объект машины
 *
 * Включает в себя описание отрисовки машины игрока
 *
 */

export default class CarObject extends BaseGameObject<CarObjectSpecs> {
  private xAxisOffset = 0

  private controlMove: CarKeyboardMove = CarKeyboardMove.CENTER

  private isLowSpeed = true

  private trackObject: TrackObject | null = null

  private enemyObject: EnemyObject | null = null

  private fuelObject: FuelObject | null = null

  private bordersSideObject: BordersSideObject | null = null

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<CarObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onStart = this.onStart.bind(this)
    this.onAnimate = this.onAnimate.bind(this)
    this.onPressKey = this.onPressKey.bind(this)
    this.onIntersection = this.onIntersection.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)

    if (initialSpecs.image) {
      this.specs.image = initialSpecs.image
    }
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    const params = this.engine.getParams()

    this.specs.sensitivity = params.gameParams.sensitivity
    this.specs.sensitivityMax = params.gameParams.sensitivityMax
    this.specs.sensitivityRatio = params.gameParams.sensitivityRatio

    this.trackObject = this.engine.getGameObject('track')

    this.enemyObject = this.engine.getGameObject('enemy')

    this.fuelObject = this.engine.getGameObject('fuel')

    this.bordersSideObject = this.engine.getGameObject('borders')

    this.engine
      .subscribe(EngineEvent.START, this.onStart)
      .subscribe(EngineEvent.ANIMATE, this.onAnimate)
      .subscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .subscribe(EngineEvent.KEY_DOWN, this.onPressKey)
      .subscribe(EngineEvent.KEY_UP, this.onPressKey)
      .subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  public drawCar() {
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

      this.canvasApi.ctx.rotate(this.specs.rotate)
    }
  }

  public draw(specs?: Partial<CarObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }

      if (this.isFirstDraw) {
        this.initialSpecs = this.specs

        this.isFirstDraw = false
      }
    }

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawCar()
    }
  }

  private checkKeyControlWithBorderIntersection() {
    const prevSpecs = this.specs

    const trackSpecs = this.trackObject?.getSpecs()

    const bordersSpecs = this.bordersSideObject?.getSpecs()

    const isOutsideLeftTrack =
      bordersSpecs &&
      prevSpecs.x <= bordersSpecs.widthLine - bordersSpecs.offsetSide &&
      this.controlMove === CarKeyboardMove.LEFT

    const isOutSideRightTrack =
      trackSpecs &&
      bordersSpecs &&
      prevSpecs.x >=
        trackSpecs.width -
          bordersSpecs.widthLine +
          bordersSpecs.offsetSide -
          prevSpecs.width &&
      this.controlMove === CarKeyboardMove.RIGHT

    return isOutsideLeftTrack || isOutSideRightTrack
  }

  private checkSpeedAndControlSensitivity() {
    const prevSpecs = this.specs

    const isMaxSpeed = this.isMaxSpeed()

    if (isMaxSpeed && this.isLowSpeed) {
      this.specs.sensitivity =
        prevSpecs.sensitivity / prevSpecs.sensitivityRatio

      this.specs.sensitivityMax =
        prevSpecs.sensitivityMax / prevSpecs.sensitivityRatio

      this.isLowSpeed = false
    } else if (!isMaxSpeed && !this.isLowSpeed) {
      this.isLowSpeed = true

      this.specs.sensitivity =
        prevSpecs.sensitivity * prevSpecs.sensitivityRatio

      this.specs.sensitivityMax =
        prevSpecs.sensitivityMax * prevSpecs.sensitivityRatio
    }
  }

  private checkSpeedAndControlBottomOffset() {
    const prevSpecs = this.specs

    const isMaxSpeed = this.isMaxSpeed()

    const instantBottomY = prevSpecs.layerHeight - prevSpecs.height

    if (isMaxSpeed && prevSpecs.y <= instantBottomY && prevSpecs.y !== 0) {
      return prevSpecs.y - prevSpecs.deltaOffsetY
    }

    if (!isMaxSpeed && prevSpecs.y < instantBottomY) {
      return prevSpecs.y + prevSpecs.deltaOffsetY * 4
    }

    if (isMaxSpeed) {
      return 0
    }

    return instantBottomY
  }

  private checkFuelIntersection() {
    if (this.fuelObject && this.trackObject) {
      const fuelSpec = this.fuelObject.getSpecs()

      const { xRangePositionCar, yRangePositionCar } =
        this.getAxisRangePositionCar()

      const xRangePositionFuel = [fuelSpec.x, fuelSpec.x + fuelSpec.width]

      const yRangePositionFuel = [fuelSpec.y, fuelSpec.y + fuelSpec.height]

      const isIntersectionByX =
        xRangePositionCar[0] < xRangePositionFuel[1] &&
        xRangePositionFuel[0] < xRangePositionCar[1]

      const isIntersectionByY =
        yRangePositionFuel[0] < yRangePositionCar[1] &&
        yRangePositionCar[0] < yRangePositionFuel[1]

      return isIntersectionByX && isIntersectionByY
    }

    return false
  }

  private checkEnemyIntersection() {
    if (this.enemyObject && this.trackObject) {
      const enemySpec = this.enemyObject.getSpecs()

      const { xRangePositionCar, yRangePositionCar } =
        this.getAxisRangePositionCar()

      const xRangePositionEnemy = [
        enemySpec.x,
        enemySpec.x + enemySpec.positionWidth,
      ]

      const yRangePositionEnemy = [
        enemySpec.y,
        enemySpec.y + enemySpec.positionHeight,
      ]

      const isIntersectionByX =
        xRangePositionCar[0] < xRangePositionEnemy[1] &&
        xRangePositionEnemy[0] < xRangePositionCar[1]

      const isIntersectionByY =
        yRangePositionEnemy[0] < yRangePositionCar[1] &&
        yRangePositionCar[0] < yRangePositionEnemy[1]

      return isIntersectionByX && isIntersectionByY
    }

    return false
  }

  private onStart(options?: EngineStartMethodOptions) {
    if (!options?.isResume) {
      this.clear()

      this.draw(this.initialSpecs)
    }
  }

  private onAnimate() {
    const prevSpecs = this.specs

    this.checkSpeedAndControlSensitivity()

    const bottomOffset = this.checkSpeedAndControlBottomOffset()

    const isEnemyIntersection = this.checkEnemyIntersection()

    const isFuelIntersection = this.checkFuelIntersection()

    const isBorderIntersection = this.checkKeyControlWithBorderIntersection()

    if (isFuelIntersection) {
      this.engine?.intersection(EngineIntersection.FUEL)
    }

    if (isEnemyIntersection) {
      this.engine?.intersection(EngineIntersection.ENEMY)

      return
    }

    if (isBorderIntersection) {
      this.engine?.intersection(EngineIntersection.BORDERS)

      return
    }

    this.draw({
      x: prevSpecs.x + this.xAxisOffset,
      y: bottomOffset,
    })
  }

  private onPressKey(event: KeyboardEvent) {
    const prevSpecs = this.specs

    const isOverSensitivity =
      Math.abs(this.xAxisOffset) >= prevSpecs.sensitivityMax

    switch (event.key) {
      case CarKeyboardControlEventKey.LEFT: {
        this.controlMove = CarKeyboardMove.LEFT

        this.xAxisOffset = isOverSensitivity
          ? this.xAxisOffset
          : this.xAxisOffset - prevSpecs.sensitivity

        break
      }

      case CarKeyboardControlEventKey.RIGHT: {
        this.controlMove = CarKeyboardMove.RIGHT

        this.xAxisOffset = isOverSensitivity
          ? this.xAxisOffset
          : this.xAxisOffset + prevSpecs.sensitivity

        break
      }

      case CarKeyboardControlEventKey.DOWN: {
        const params = this.engine?.getParams()

        if (
          params &&
          params?.playerProgress.speed > params?.gameParams.startSpeed
        ) {
          this.engine?.setSpeed(params.playerProgress.speed - 0.5)
        }

        break
      }

      default: {
        this.controlMove = CarKeyboardMove.CENTER

        break
      }
    }

    switch (event.type) {
      case 'keyup':
        this.controlMove = CarKeyboardMove.CENTER
        this.xAxisOffset = 0

        break

      default:
        break
    }
  }

  private onIntersection(intersectionType: EngineIntersection) {
    switch (intersectionType) {
      default:
        break
    }
  }

  protected onEnd() {
    this.isLowSpeed = true

    this.controlMove = CarKeyboardMove.CENTER
  }

  private getAxisRangePositionCar() {
    if (this.trackObject) {
      const carSpecs = this.getSpecs()
      const trackSpecs = this.trackObject.getSpecs()

      const yCar =
        trackSpecs.height -
        carSpecs.bottomOffset -
        carSpecs.layerHeight +
        carSpecs.y

      const xRangePositionCar = [
        carSpecs.x,
        carSpecs.x + carSpecs.positionWidth,
      ]

      const yRangePositionCar = [yCar, yCar + carSpecs.positionHeight]

      return { xRangePositionCar, yRangePositionCar }
    }

    return { xRangePositionCar: [0, 0], yRangePositionCar: [0, 0] }
  }

  private isMaxSpeed() {
    const params = this.engine?.getParams()

    return params && params?.playerProgress.speed >= params?.gameParams.maxSpeed
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.START, this.onStart)
      .unsubscribe(EngineEvent.ANIMATE, this.onAnimate)
      .unsubscribe(EngineEvent.KEY_DOWN, this.onPressKey)
      .unsubscribe(EngineEvent.KEY_UP, this.onPressKey)
      .unsubscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }
}
