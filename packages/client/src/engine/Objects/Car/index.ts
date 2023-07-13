import { BaseObject } from '@/engine/Objects'
import { CarObjectSpecs, CarKeyboadControlEventKey } from './types'
import { canvas } from '@/utils'

/*
 * @INFO Объект машины
 *
 * Включает в себя описание отрисовки машины и, возможно, других машин на трассе
 *
 */
export default class CarObject extends BaseObject<CarObjectSpecs> {
  static dimensions = {
    with: 60,
    height: 130,
  }

  static sensitivity = 8

  static createBaseCarSpecs(carImageSrc: string, x: number, y: number) {
    const carCanvasImage = new Image()
    carCanvasImage.src = carImageSrc

    return {
      image: carCanvasImage,
      x,
      y,
      width: CarObject.dimensions.with,
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

      this.canvasApi.ctx.drawImage(
        this.specs.image,
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
    return trackWidth / 2 - CarObject.dimensions.with / 2
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
