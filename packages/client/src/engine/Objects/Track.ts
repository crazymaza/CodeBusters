import BaseObject, { BaseObjectSpecs } from './Base'

export default class TrackObject extends BaseObject<BaseObjectSpecs> {
  protected draw(
    delta: number,
    specs: Partial<BaseObjectSpecs>
  ): BaseObjectSpecs {
    if (this.canvasApi.ctx) {
      this.clear()

      this.canvasApi.ctx.fillStyle = 'lightgray'

      // Внешний контур трассы
      this.canvasApi.ctx.fillStyle = 'green'
      this.canvasApi.ctx.fillRect(
        50,
        50 + delta,
        this.canvasApi.element.width - 100,
        this.canvasApi.element.height - 100
      )

      // Внутренний контур трассы
      this.canvasApi.ctx.fillStyle = 'white'
      this.canvasApi.ctx.fillRect(
        100,
        100 + delta,
        this.canvasApi.element.width - 200,
        this.canvasApi.element.height - 200
      )

      // Центральная линия трассы
      this.canvasApi.ctx.strokeStyle = 'black'
      this.canvasApi.ctx.lineWidth = 4
      this.canvasApi.ctx.beginPath()
      this.canvasApi.ctx.moveTo(50, this.canvasApi.element.height / 2 + delta)
      this.canvasApi.ctx.lineTo(
        this.canvasApi.element.width - 50,
        this.canvasApi.element.height / 2 + delta
      )
      this.canvasApi.ctx.stroke()
    }

    return this.updateSpecs(specs)
  }
}
