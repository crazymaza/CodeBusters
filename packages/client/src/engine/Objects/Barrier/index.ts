import { BaseObject, TrackObject } from '@/engine/Objects'
import { BarrierObjectSpecs } from './types'

function getPositionBarrier() {
  return {
    x: 0,
    y: 128,
    w: 70,
    h: 64,
  }
}

/*
 * @INFO Объект препятствия
 * Все характеристики собраны в статическом объекте currentSpec
 * В остальном коде нужно изменять именно эти данные
 */
export default class BarrierObject extends BaseObject<BarrierObjectSpecs> {
  static currentSpec = {
    x: Math.floor(Math.random() * TrackObject.width),
    y: -200,
    width: Math.floor(TrackObject.width / 4),
    height: 100,
    trackHeight: 0,
  }

  static createBaseBarrierSpecs(
    containerHTML: HTMLElement,
    barrierImageSrc: string
  ) {
    const barrierImage = new Image()
    barrierImage.src = barrierImageSrc

    BarrierObject.currentSpec.trackHeight = containerHTML.offsetHeight || 0
    return {
      image: barrierImage,
      x: BarrierObject.currentSpec.x,
      y: BarrierObject.currentSpec.y,
      width: BarrierObject.currentSpec.width,
      height: BarrierObject.currentSpec.height,
    }
  }

  public drawBarrier() {
    if (this.canvasApi.ctx && this.specs) {
      const ctx = this.canvasApi.ctx as CanvasRenderingContext2D

      const barrier_position = getPositionBarrier()

      // Отрисовка барьера
      ctx.drawImage(
        this.specs?.image,
        barrier_position.x,
        barrier_position.y,
        barrier_position.w,
        barrier_position.h,
        BarrierObject.currentSpec.x,
        BarrierObject.currentSpec.y,
        BarrierObject.currentSpec.width,
        BarrierObject.currentSpec.height
      )
    }
  }
  public setBarrierYAxis(yAxis: number) {
    if (BarrierObject.currentSpec.y != null) {
      BarrierObject.currentSpec.y = yAxis
    }
  }

  public setBarrierXAxis(xAxis: number) {
    if (BarrierObject.currentSpec.x != null) {
      BarrierObject.currentSpec.x = xAxis
    }
  }

  public draw(
    delta: number,
    specs: BaseObjectSpecs = BarrierObject.currentSpec
  ) {
    this.specs = specs

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawBarrier()
    }
  }
}
