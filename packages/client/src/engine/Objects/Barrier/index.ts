import { BaseObject, TrackObject } from '@/engine/Objects'
import { TrackBoundarySide } from '@/engine/Objects/Track/types'
import { BarrierObjectSpecs } from '@/engine/Objects/Barrier/types'

/*
 * @INFO Объект препятствия
 */
export default class BarrierObject extends BaseObject<BarrierObjectSpecs> {
  private barrierTopOffset = -550

  static createBaseBarrierSpecs(containerHTML: HTMLElement) {
    const trackHeight = containerHTML.offsetHeight || 0
    return {
      x: 0,
      y: -550,
      width: 50,
      height: trackHeight,
      fill: '#e3bc27',
      barrierCount: Math.floor(TrackObject.boundarySpecs.height / 3) + 1,
    }
  }

  private createBarrier(side: TrackBoundarySide) {
    return Array.from({
      length: 2,
    }).map(() => {
      const xAxis = side === TrackBoundarySide.LEFT ? 15 : 240

      const yAxis =
        side === TrackBoundarySide.LEFT
          ? this.barrierTopOffset
          : this.barrierTopOffset - 1500

      return {
        xAxis,
        yAxis,
        width: TrackObject.width / 2,
        height: 10,
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
