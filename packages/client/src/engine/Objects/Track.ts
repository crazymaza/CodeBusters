import BaseObject, { BaseObjectSpecs } from './Base'

export default class TrackObject extends BaseObject<BaseObjectSpecs> {
  private boundaryCount = 14

  private boundarySpecs = {
    leftOffset: 2,
    width: 10,
    height: 80,
    padding: 8,
    fillOdd: '#ffffff',
    fillEvent: '#d33939',
  }

  public type = 'track'

  static createBaseTrackSpecs(containerHTML: HTMLElement) {
    const trackWidth = 500
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

  private createBoundary(side: 'left' | 'right', topOffset = 0) {
    return Array.from({ length: this.boundaryCount }).map(() => {
      const offset =
        side === 'left'
          ? this.boundarySpecs.leftOffset
          : this.boundarySpecs.leftOffset -
            (this.boundarySpecs.width + this.boundarySpecs.leftOffset * 2) +
            (this.specs?.width || 0)

      console.log('OFFSET', topOffset)

      return {
        offset,
        topOffset,
        width: this.boundarySpecs.width,
        height: this.boundarySpecs.height,
      }
    })
  }

  protected drawTrack() {
    if (this.canvasApi.ctx && this.specs) {
      const specs = this.specs as BaseObjectSpecs

      this.canvasApi.element.width = specs.width
      this.canvasApi.element.height = specs.height

      this.canvasApi.ctx.fillStyle = specs.fill as string
      this.canvasApi.ctx.fillRect(specs.x, specs.y, specs.width, specs.height)
    }
  }

  public drawBoundary(topOffset = 0) {
    if (this.canvasApi.ctx && this.boundarySpecs) {
      const leftBoundary = this.createBoundary('left', topOffset)
      const rightBoundary = this.createBoundary('right', topOffset)

      let cycle = 0

      const totalCycle = this.boundarySpecs.height + this.boundarySpecs.padding

      cycle = (cycle + 1) % totalCycle

      for (const boundary of [leftBoundary, rightBoundary]) {
        for (let i = 0; i < boundary.length; i++) {
          boundary[i].topOffset = cycle + (i - 1) * totalCycle

          this.canvasApi.ctx.fillStyle =
            i % 2 === 0
              ? this.boundarySpecs.fillEvent
              : this.boundarySpecs.fillOdd

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
