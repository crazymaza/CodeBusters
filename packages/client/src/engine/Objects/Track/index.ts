import { BaseObject } from '@/engine/Objects'
import { TrackObjectSpecs, TrackBoundarySide } from './types'

/*
 * @INFO Объект трассы
 *
 * Включает в себя описание отрисовки самой трассы и ее границ
 * для имитации скорости машины
 *
 */
export default class TrackObject extends BaseObject<TrackObjectSpecs> {
  private boundaryTopOffset = 0

  static boundarySpecs = {
    leftOffset: 2,
    width: 10,
    height: 80,
    padding: 8,
    fillOdd: '#fff',
    fillEvent: '#d33939',
  }

  static width = 500

  static createBaseTrackSpecs(containerHTML: HTMLElement) {
    const trackWidth = TrackObject.width
    const trackHeight = containerHTML.offsetHeight || 0
    const trackFill = 'gray'

    return {
      x: 0,
      y: 0,
      width: trackWidth,
      height: trackHeight,
      fill: trackFill,
      boundaryCount:
        Math.round(trackHeight / TrackObject.boundarySpecs.height) + 1,
    }
  }

  private createBoundary(side: TrackBoundarySide) {
    return Array.from({
      length: (this.specs?.boundaryCount || 0) + this.boundaryTopOffset,
    }).map(() => {
      const boundarySpecs = TrackObject.boundarySpecs

      const offset =
        side === TrackBoundarySide.LEFT
          ? boundarySpecs.leftOffset
          : boundarySpecs.leftOffset -
            (TrackObject.boundarySpecs.width + boundarySpecs.leftOffset * 2) +
            (this.specs?.width || 0)

      return {
        offset,
        topOffset: this.boundaryTopOffset,
        width: boundarySpecs.width,
        height: boundarySpecs.height,
      }
    })
  }

  public drawTrack() {
    if (this.canvasApi.ctx && this.specs) {
      const specs = this.specs as TrackObjectSpecs

      this.canvasApi.element.width = specs.width
      this.canvasApi.element.height = specs.height

      this.canvasApi.ctx.fillStyle = specs.fill as string
      this.canvasApi.ctx.fillRect(specs.x, specs.y, specs.width, specs.height)
    }
  }

  public drawBoundary(topOffset = 0) {
    if (this.canvasApi.ctx) {
      this.boundaryTopOffset = topOffset

      const boundarySpecs = TrackObject.boundarySpecs

      const boundaries = [
        this.createBoundary(TrackBoundarySide.LEFT),
        this.createBoundary(TrackBoundarySide.RIGHT),
      ]

      const boundaryFullHeight = boundarySpecs.height + boundarySpecs.padding

      const ctx = this.canvasApi.ctx as CanvasRenderingContext2D
      const trackHeight = this.specs?.height || 0

      // Отрисовка границ трассы слева и справа, а также их смещение на this.boundaryTopOffset
      boundaries.forEach(boundary => {
        let boundaryIndex = 0

        while (boundaryIndex < boundary.length) {
          boundary[boundaryIndex].topOffset =
            trackHeight -
            boundaryFullHeight * boundaryIndex +
            this.boundaryTopOffset

          ctx.fillStyle =
            boundaryIndex % 2 === 0
              ? boundarySpecs.fillEvent
              : boundarySpecs.fillOdd

          ctx.fillRect(
            boundary[boundaryIndex].offset,
            boundary[boundaryIndex].topOffset,
            boundary[boundaryIndex].width,
            boundary[boundaryIndex].height
          )

          boundaryIndex += 1
        }
      })
    }
  }

  public draw(delta: number, specs: TrackObjectSpecs) {
    this.specs = specs

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawTrack()
      this.drawBoundary()
    }
  }
}
