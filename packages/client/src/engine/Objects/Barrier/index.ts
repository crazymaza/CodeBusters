import { BaseObject, TrackObject } from '@/engine/Objects'
import { BaseObjectSpecs } from '@/engine/Objects/Base/types'

/*
 * @INFO Объект препятствия
 * Все характеристики собраны в статическом объекте currentSpec
 * В остальном коде нужно изменять именно эти данные
 */
export default class BarrierObject extends BaseObject<BaseObjectSpecs> {
  static currentSpec = {
    x: Math.floor(Math.random() * TrackObject.width),
    y: -200,
    width: Math.floor(TrackObject.width / 3),
    height: 150,
    fill: '#e3bc27',
    trackHeight: 0,
  }

  static createBaseBarrierSpecs(containerHTML: HTMLElement) {
    BarrierObject.currentSpec.trackHeight = containerHTML.offsetHeight || 0
    return {
      x: BarrierObject.currentSpec.x,
      y: BarrierObject.currentSpec.y,
      width: BarrierObject.currentSpec.width,
      height: BarrierObject.currentSpec.height,
      fill: BarrierObject.currentSpec.fill,
    }
  }

  public drawBarrier() {
    if (this.canvasApi.ctx) {
      const ctx = this.canvasApi.ctx as CanvasRenderingContext2D

      // Отрисовка барьера
      ctx.fillStyle = BarrierObject.currentSpec.fill
      ctx.fillRect(
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
