import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import { EngineEvent, EngineAnimateParams } from '@/engine/Core/types'
import { BaseGameObject, LineObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import { CentralLinesObjectSpecs } from './types'

export default class CentralLinesObject extends BaseGameObject<CentralLinesObjectSpecs> {
  private deltaTopOffset = 0

  private lines: LineObject[] = []

  private topLine: LineObject | null = null

  private xAxisCenter = 0

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<CentralLinesObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onAnimate = this.onAnimate.bind(this)

    this.onDestroy = this.onDestroy.bind(this)

    // Устанавливаем высоту всего контейнера по высоте трека
    this.specs.height = this.canvasApi.element.offsetHeight
  }

  private onAnimate(timestamp: number, params: EngineAnimateParams) {
    this.deltaTopOffset = params.playerProgress.speed

    this.drawLines()
  }

  private onDestroy() {
    this.engine?.eventEmitter.off(EngineEvent.ANIMATE, this.onAnimate)
    this.engine?.eventEmitter.off(EngineEvent.DESTROY, this.onDestroy)
  }

  private calculateOffsetY(index: number, prevOffsetY: number) {
    const lineFullHeight = this.specs.heightLine + this.specs.paddingLine

    // Считаем Y координату сдвига вниз
    const offsetY = prevOffsetY + this.deltaTopOffset

    // Если Y координата ушла за зону игрового поля, сдвигаем ее начало экрана
    if (offsetY > this.specs.height) {
      const topOffsetY = -lineFullHeight

      this.topLine = this.lines[index]

      return topOffsetY
    }

    return offsetY
  }

  private createLine(key: string, offsetY: number) {
    const lineObject = new LineObject(key, this.canvasApi, {
      x: this.xAxisCenter,
      y: offsetY,
      width: this.specs.widthLine,
      height: this.specs.heightLine,
    })

    lineObject.draw()

    return lineObject
  }

  public drawLines() {
    this.clear()

    if (this.lines.length > 0) {
      this.lines.forEach((lineObject, index) => {
        const currentOffsetY = lineObject.getSpecs().y

        // Вычисление координат центральных линий в зависимочти от скорости
        lineObject.draw({
          y: this.calculateOffsetY(index, currentOffsetY),
        })
      })
    } else {
      this.lines = Array.from({
        length: this.specs.countLines,
      }).map((_, index) => {
        // Постороение начальных координат центральных линий
        const offsetY =
          this.specs.height -
          (this.specs.heightLine + this.specs.paddingLine) * index

        return this.createLine(`line-center-${index}`, offsetY)
      })

      this.topLine = this.lines[this.lines.length - 1]
    }
  }

  public draw(specs?: Partial<CentralLinesObjectSpecs>) {
    if (specs) {
      this.specs = { ...this.specs, ...specs }
    }

    // Считаем сколько линий нужно на треке, исходя из размеров линии и высоты трека
    this.specs.countLines =
      Math.round(
        this.specs.height / (this.specs.heightLine + this.specs.paddingLine)
      ) + 1

    // Вычисляем центр трассы
    this.xAxisCenter = this.specs.width / 2 - this.specs.widthLine / 2

    this.drawLines()
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine.eventEmitter.on(EngineEvent.ANIMATE, this.onAnimate)
    this.engine.eventEmitter.on(EngineEvent.DESTROY, this.onDestroy)
  }
}
