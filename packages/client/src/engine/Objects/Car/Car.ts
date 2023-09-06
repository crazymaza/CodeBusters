import { canvas } from '@/utils'
import CodeBustersEngine from '@/engine/Core/Core'
import { ENGINE_EVENT } from '@/engine/Core/Core'
import BaseGameObject, {
  BaseGameObjectSpecs,
} from '@/engine/Objects/Base/BaseGameObject'

/*
 * @INFO Объект машины
 *
 * Включает в себя описание отрисовки машины и, возможно, других машин на трассе
 *
 */

export enum CarKeyboardControlEventKey {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight',
}

export type CarObjectSpecs = {
  image: CanvasImageSource
  sensitivity?: number
} & BaseGameObjectSpecs

const INITIAL_SPECS = {
  x: 0,
  y: 0,
  width: 70,
  height: 140,
  fill: '#fff',
  image: new Image(),
  sensitivity: 40,
}

// Получаем координаты машинки
function getCarPosition() {
  return {
    x: 0,
    y: 0,
    w: 64,
    h: 128,
  }
}

export default class CarObject extends BaseGameObject<CarObjectSpecs> {
  protected specs: CarObjectSpecs = INITIAL_SPECS

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<CarObjectSpecs> = {}
  ) {
    super(key, canvasApi, initialSpecs)

    if (initialSpecs.image) {
      this.specs.image = initialSpecs.image
    }
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine.eventEmitter.on(
      ENGINE_EVENT.PRESS_KEY,
      this.onPressKey.bind(this)
    )
  }

  public drawCar() {
    if (this.canvasApi.ctx && this.specs) {
      const carPosition = getCarPosition()

      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.drawImage(
        this.specs.image,
        carPosition.x,
        carPosition.y,
        carPosition.w,
        carPosition.h,
        this.specs.x,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )
    }
  }

  public draw(specs?: Partial<CarObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }
    }

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawCar()
    }
  }

  private onPressKey(event: KeyboardEvent) {
    const prevSpecs = this.specs as CarObjectSpecs

    switch (event.key) {
      case CarKeyboardControlEventKey.LEFT:
        this.draw({
          x:
            prevSpecs.x - (this.specs.sensitivity || INITIAL_SPECS.sensitivity),
        })
        break

      case CarKeyboardControlEventKey.RIGHT:
        this.draw({
          x:
            prevSpecs.x + (this.specs.sensitivity || INITIAL_SPECS.sensitivity),
        })
        break

      default:
        break
    }
  }
}
