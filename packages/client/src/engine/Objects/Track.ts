import BaseObject, { BaseObjectSpecs } from './Base'

export default class TrackObject extends BaseObject<BaseObjectSpecs> {
  private boundaryCount = 14
  private boundaryTopOffset = 0

  public type = 'track'

  static boundarySpecs = {
    leftOffset: 2,
    width: 10,
    height: 80,
    padding: 8,
    fillOdd: '#a3c6ff',
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
    }
  }

  private createBoundary(side: 'left' | 'right') {
    return Array.from({ length: this.boundaryCount }).map(() => {
      const boundarySpecs = TrackObject.boundarySpecs

      const offset =
        side === 'left'
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
      const specs = this.specs as BaseObjectSpecs

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

      const leftBoundary = this.createBoundary('left')
      const rightBoundary = this.createBoundary('right')

      const totalCycle = boundarySpecs.height + boundarySpecs.padding

      let cycle = 0

      cycle = (cycle + 1) % totalCycle

      // TODO Требует оптимизации и рефакторинга. Отвечает за перерисовку боковых ограничителей трассы
      for (const boundary of [leftBoundary, rightBoundary]) {
        for (let i = 0; i < boundary.length; i++) {
          boundary[i].topOffset =
            cycle + (i - 1) * totalCycle + this.boundaryTopOffset

          this.canvasApi.ctx.fillStyle =
            i % 2 === 0 ? boundarySpecs.fillEvent : boundarySpecs.fillOdd

          this.canvasApi.ctx.fillRect(
            boundary[i].offset,
            boundary[i].topOffset,
            boundary[i].width,
            boundary[i].height
          )
        }
      }
    }
  }

  public draw(delta: number, specs: BaseObjectSpecs) {
    this.specs = specs

    if (this.canvasApi.ctx) {
      this.clear()
      this.drawTrack()
      this.drawBoundary()
    }
  }
}
