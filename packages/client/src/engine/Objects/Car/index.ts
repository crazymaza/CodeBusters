import { BaseObject } from '@/engine/Objects'
import { CarObjectSpecs, CarKeyboadControlEventKey } from './types'
import { canvas } from '@/utils'

// Получаем координаты машинки
function getCarPosition() {
  return {
    x: 0,
    y: 0,
    w: 64,
    h: 120,
  }
}

/*
 * @INFO Объект машины
 *
 * Включает в себя описание отрисовки машины и, возможно, других машин на трассе
 *
 */
export default class CarObject extends BaseObject<CarObjectSpecs> {
  static dimensions = {
    widdth: 70,
    height: 140,
    yAxisPosition: 0,
    bottomMargin: 30,
  }

  static sensitivity = 40

  static createBaseCarSpecs(
    carImageSrc: string,
    x: number,
    y: number,
    trackHeight: number
  ) {
    const carCanvasImage = new Image()
    carCanvasImage.src = carImageSrc
    CarObject.dimensions.yAxisPosition =
      trackHeight -
      CarObject.dimensions.height -
      CarObject.dimensions.bottomMargin

    return {
      image: carCanvasImage,
      x,
      y,
      width: CarObject.dimensions.width,
      height: CarObject.dimensions.height,
    }
  }

  constructor(protected canvasApi: ReturnType<typeof canvas>) {
    super(canvasApi)

    this.onKeyDown = this.onKeyDown.bind(this)
  }

  public drawCar() {
    if (this.canvasApi.ctx && this.specs) {
      this.clear()

      const car_position = getCarPosition()

      this.canvasApi.ctx.drawImage(
        this.specs.image,
        car_position.x,
        car_position.y,
        car_position.w,
        car_position.h,
        this.specs.x,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )
    }
  }

  public draw(delta: number, specs: CarObjectSpecs) {
    this.specs = specs

    this.drawCar()
  }

  public getCenterOnTrack(trackWidth: number) {
    return trackWidth / 2 - CarObject.dimensions.width / 2
  }

  private onKeyDown(event: KeyboardEvent) {
    const prevSpecs = this.specs as CarObjectSpecs

    switch (event.key) {
      case CarKeyboadControlEventKey.LEFT:
        this.clear()

        this.draw(0, {
          ...prevSpecs,
          x: prevSpecs.x - CarObject.sensitivity,
        })
        break

      case CarKeyboadControlEventKey.RIGHT:
        this.clear()

        this.draw(0, {
          ...prevSpecs,
          x: prevSpecs.x + CarObject.sensitivity,
        })
        break

      default:
        break
    }
  }

  public addListeners() {
    document.addEventListener('keydown', this.onKeyDown)
  }

  public removeListeners() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
