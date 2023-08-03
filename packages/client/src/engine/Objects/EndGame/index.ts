import BaseObject from '../Base'
import { EndGameMessageObjectSpecs } from './types'

export default class EndGameMessageObject extends BaseObject<EndGameMessageObjectSpecs> {
  static dimension = {
    indent: 25,
    border: 30,
    lineSpacing: 50,
    textYAxisBegin: 100,
  }

  static createBaseEndGameMessageSpecs(width: number, height: number) {
    return {
      x: EndGameMessageObject.dimension.border,
      y: 100,
      width: width - EndGameMessageObject.dimension.border,
      height: 200,
      fontColor: 'red',
      strokeColor: 'white',
      rectColor: '#565656',
      strokeWidth: 6,
    }
  }

  public drawEndGameMessage(score = 0) {
    if (this.canvasApi.ctx && this.specs) {
      this.canvasApi.ctx.fillStyle = this.specs.rectColor
      this.canvasApi.ctx.fillRect(
        this.specs.x,
        this.specs.y,
        this.specs.width - EndGameMessageObject.dimension.border,
        this.specs.height
      )
      this.canvasApi.ctx.strokeStyle = this.specs.strokeColor
      this.canvasApi.ctx.lineWidth = this.specs.strokeWidth
      const strokeIdent = this.specs.strokeWidth / 2
      this.canvasApi.ctx.strokeRect(
        this.specs.x + strokeIdent,
        this.specs.y + strokeIdent,
        this.specs.width - EndGameMessageObject.dimension.border - strokeIdent,
        this.specs.height - strokeIdent
      )
      this.canvasApi.ctx.fillStyle = this.specs.fontColor
      this.canvasApi.ctx.font = '30px PressStart'
      this.canvasApi.ctx.fillText(
        'Игра окончена',
        this.specs.x + EndGameMessageObject.dimension.indent,
        this.specs.y + EndGameMessageObject.dimension.textYAxisBegin
      )
      this.canvasApi.ctx.font = '20px PressStart'
      this.canvasApi.ctx.fillText(
        `Результат: ${score}`,
        this.specs.x + EndGameMessageObject.dimension.indent * 4,
        this.specs.y +
          EndGameMessageObject.dimension.textYAxisBegin +
          EndGameMessageObject.dimension.lineSpacing
      )
    }
  }

  public draw(delta: number, specs: EndGameMessageObjectSpecs) {
    this.specs = specs
    this.drawEndGameMessage()
  }
}
