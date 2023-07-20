import { BaseObject } from '@/engine/Objects'
import { TrackObjectSpecs, TrackBoundarySide, TrackLineSide } from './types'

/*
 * @INFO Объект трассы
 *
 * Включает в себя описание отрисовки самой трассы и ее границ
 * для имитации скорости машины
 *
 */
export default class TrackObject extends BaseObject<TrackObjectSpecs> {
  private trackObjectsTopOffset = 0

  static linesSpecs = {
    leftOffset: 150,
    width: 10,
    heigth: 140,
    padding: 100,
    fillColor: '#fff',
  }

  static boundarySpecs = {
    leftOffset: 2,
    width: 10,
    height: 80,
    padding: 8,
    fill: {
      even: '#d33939',
      odd: '#fff',
    },
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
      linesCount: Math.round(trackHeight / TrackObject.linesSpecs.heigth) + 1,
    }
  }

  private createBoundary(side: TrackBoundarySide) {
    return Array.from({
      length: (this.specs?.boundaryCount || 0) + this.trackObjectsTopOffset,
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
        topOffset: this.trackObjectsTopOffset,
        width: boundarySpecs.width,
        height: boundarySpecs.height,
      }
    })
  }

  private createLine(side: TrackLineSide) {
    return Array.from({
      length: (this.specs?.linesCount || 0) + this.trackObjectsTopOffset,
    }).map(() => {
      const linesSpecs = TrackObject.linesSpecs

      let offset = 0

      if (side === TrackLineSide.LEFT) {
        offset = linesSpecs.leftOffset
      }

      if (side === TrackLineSide.RIGHT) {
        offset =
          linesSpecs.leftOffset -
          (TrackObject.linesSpecs.width + linesSpecs.leftOffset * 2) +
          (this.specs?.width || 0)
      }

      return {
        offset,
        topOffset: this.trackObjectsTopOffset,
        width: linesSpecs.width,
        heigth: linesSpecs.heigth,
      }
    })
  }

  public drawTrack() {
    if (this.canvasApi.ctx && this.specs) {
      const specs = this.specs as TrackObjectSpecs

      this.canvasApi.element.width = specs.width
      this.canvasApi.element.height = specs.height

      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.fillStyle = specs.fill as string
      this.canvasApi.ctx.fillRect(specs.x, specs.y, specs.width, specs.height)
    }
  }

  public drawLines(offset = 0) {
    if (this.canvasApi.ctx) {
      this.trackObjectsTopOffset = offset

      const linesSpecs = TrackObject.linesSpecs

      const lines = [
        this.createLine(TrackLineSide.LEFT),
        this.createLine(TrackLineSide.RIGHT),
      ]

      const lineFullHeight = linesSpecs.heigth + linesSpecs.padding

      const ctx = this.canvasApi.ctx as CanvasRenderingContext2D
      const trackHeight = this.specs?.height || 0

      lines.forEach(line => {
        let lineIndex = 0

        while (lineIndex < line.length) {
          ctx.beginPath()

          line[lineIndex].topOffset =
            trackHeight -
            lineFullHeight * lineIndex +
            this.trackObjectsTopOffset

          ctx.fillStyle = linesSpecs.fillColor

          ctx.strokeStyle = 'black'

          ctx.strokeRect(
            line[lineIndex].offset,
            line[lineIndex].topOffset,
            line[lineIndex].width,
            line[lineIndex].heigth
          )
          ctx.fillRect(
            line[lineIndex].offset,
            line[lineIndex].topOffset,
            line[lineIndex].width,
            line[lineIndex].heigth
          )

          lineIndex += 1
        }
      })
    }
  }

  public drawBoundary(topOffset = 0) {
    if (this.canvasApi.ctx) {
      this.trackObjectsTopOffset = topOffset

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
          ctx.beginPath()

          boundary[boundaryIndex].topOffset =
            trackHeight -
            boundaryFullHeight * boundaryIndex +
            this.trackObjectsTopOffset

          ctx.fillStyle =
            boundaryIndex % 2 === 0
              ? boundarySpecs.fill.even
              : boundarySpecs.fill.odd

          ctx.strokeRect(
            boundary[boundaryIndex].offset,
            boundary[boundaryIndex].topOffset,
            boundary[boundaryIndex].width,
            boundary[boundaryIndex].height
          )
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
      this.drawLines()
    }
  }
}
