import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import { BaseGameObject } from '@/engine/Objects'
import { EngineEvent, EngineProcess } from '@/engine/Core/types'
import { INITIAL_SPECS } from './const'
import { MessageObjectSpecs } from './types'

export default class MessageObject extends BaseGameObject<MessageObjectSpecs> {
  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<MessageObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onChangeProcess = this.onChangeProcess.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine
      .subscribe(EngineEvent.CHANGE_PROCESS, this.onChangeProcess)
      .subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.CHANGE_PROCESS, this.onChangeProcess)
      .unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  protected onEnd() {
    return false
  }

  public onChangeProcess(engineProcess: EngineProcess) {
    this.clear()

    const params = this.engine?.getParams()

    switch (engineProcess) {
      case EngineProcess.PAUSE:
        this.draw({
          header: 'Пауза в игре',
          text: `Очки: ${params?.playerProgress.scores}`,
        })

        break

      case EngineProcess.END: {
        this.draw({
          header:
            params!.playerProgress.timeLeft <= 0
              ? 'Закончился бензин'
              : 'Игра окончена',
          text: `Очки: ${params?.playerProgress.scores}`,
        })

        break
      }

      default:
        break
    }
  }

  public drawMessage() {
    if (this.canvasApi.ctx && this.specs) {
      this.canvasApi.ctx.fillStyle = this.specs.rectColor

      this.canvasApi.ctx.fillRect(
        this.specs.x,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )

      this.canvasApi.ctx.strokeStyle = this.specs.strokeColor

      this.canvasApi.ctx.lineWidth = this.specs.strokeWidth

      const strokeIdent = this.specs.strokeWidth / 2

      this.canvasApi.ctx.strokeRect(
        this.specs.x + strokeIdent,
        this.specs.y + strokeIdent,
        this.specs.width,
        this.specs.height - strokeIdent
      )

      this.canvasApi.ctx.fillStyle = this.specs.fontColor

      this.canvasApi.ctx.font = '25px PressStart'

      const widthHeader = this.canvasApi.ctx.measureText(
        this.specs.header
      ).width

      this.canvasApi.ctx.fillText(
        this.specs.header,
        this.specs.width / 2 - widthHeader / 2,
        this.specs.y + this.specs.textYAxisBegin
      )

      this.canvasApi.ctx.font = '15px PressStart'

      const widthText = this.canvasApi.ctx.measureText(this.specs.header).width

      this.canvasApi.ctx.fillText(
        this.specs.text,
        this.specs.width / 2 - widthText / 2,
        this.specs.y + this.specs.textYAxisBegin + this.specs.lineSpacing
      )
    }
  }

  public draw(specs?: Partial<MessageObjectSpecs>) {
    this.specs = { ...this.specs, ...specs }

    if (this.isFirstDraw) {
      this.initialSpecs = this.specs

      this.isFirstDraw = false
    }

    this.drawMessage()
  }
}
