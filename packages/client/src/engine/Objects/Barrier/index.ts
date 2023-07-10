import { BaseObject, TrackObject } from '@/engine/Objects'
import { TrackBoundarySide } from '@/engine/Objects/Track/types'
import { BarrierObjectSpecs } from '@/engine/Objects/Barrier/types'

/*
 * @INFO Объект препятствия
 */
export default class BarrierObject extends BaseObject<BarrierObjectSpecs> {
  private barrierTopOffset = 0

  static createBaseBarrierSpecs(containerHTML: HTMLElement) {
    return {
      x: 0,
      y: 0,
      width: Math.floor(Math.random() * (TrackObject.width / 3) + 20),
      height: Math.floor(Math.random() * 10 + 5),
      fill: '#e3bc27',
      barrierCount: Math.floor(TrackObject.boundarySpecs.height / 3) + 1,
    }
  }

  private createBarrier(side: TrackBoundarySide) {
    return Array.from({
      length: 2,
    }).map(() => {
      const xAxis = side === TrackBoundarySide.LEFT ? 15 : 360

      const yAxis =
        side === TrackBoundarySide.LEFT
          ? this.barrierTopOffset
          : this.barrierTopOffset + 100

      return {
        xAxis,
        yAxis,
        width: Math.floor(Math.random() * (TrackObject.width / 2)),
        height: Math.floor(Math.random() * 10 + 5),
      }
    })
  }

  public drawBarrier(topOffset = 0) {
    if (this.canvasApi.ctx) {
      this.barrierTopOffset = topOffset

      const boundaries = [
        this.createBarrier(TrackBoundarySide.LEFT),
        this.createBarrier(TrackBoundarySide.RIGHT),
      ]

      const ctx = this.canvasApi.ctx as CanvasRenderingContext2D

      // Отрисовка границ трассы слева и справа, а также их смещение на this.boundaryTopOffset
      boundaries.forEach(boundary => {
        let boundaryIndex = 0

        while (boundaryIndex < boundary.length) {
          ctx.fillStyle = '#e3bc27'

          ctx.fillRect(
            boundary[boundaryIndex].xAxis,
            boundary[boundaryIndex].yAxis,
            boundary[boundaryIndex].width,
            boundary[boundaryIndex].height
          )

          boundaryIndex += 1
        }
      })
    }
  }

  public draw(delta: number, specs: BarrierObjectSpecs) {
    this.specs = specs

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawBarrier()
    }
  }
}
