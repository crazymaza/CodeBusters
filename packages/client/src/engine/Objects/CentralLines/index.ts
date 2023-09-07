import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import { EngineEvent, EngineAnimateParams } from '@/engine/Core/types'
import { BaseGameObject, LineObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import { CentralLinesObjectSpecs } from './types'

export default class CentralLinesObject extends BaseGameObject<CentralLinesObjectSpecs> {
  private deltaTopOffset = 0
  private lines: LineObject[] = []

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<CentralLinesObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    // Устанавливаем высоту всего контейнера по высоте трека
    this.specs.height = this.canvasApi.element.offsetHeight

    console.log('this.specs.countLines', this.specs.countLines)
  }

  private calculateOffsetY(index: number, prevOffsetY: number) {
    // Считаем y координату сдвига вниз

    // console.log('PREV Y', index, ':', prevOffsetY, this.deltaTopOffset)

    // if (prevOffsetY < 0 && index === 0) {
    //   console.log(
    //     'Is less',
    //     index,
    //     prevOffsetY,
    //     prevOffsetY + this.deltaTopOffset
    //   )
    //   return prevOffsetY + this.deltaTopOffset
    // }

    const lineFullHeight = this.specs.heightLine + this.specs.paddingLine

    let offsetY =
      this.specs.height - index * lineFullHeight + this.deltaTopOffset

    if (offsetY > this.specs.height) {
      offsetY = -lineFullHeight + this.deltaTopOffset
    }

    if (index === 1) {
      console.log('offsetY', offsetY, prevOffsetY, index)
    }

    // (this.deltaTopOffset % this.specs.height) * index + this.deltaTopOffset

    // const offsetY =
    //   this.specs.height -
    //   (this.specs.heightLine + this.specs.paddingLine) * index +
    //   this.deltaTopOffset

    // if (offsetY >= this.specs.height && index === 0) {
    //   const droppedOffsetY = -(this.specs.heightLine + this.specs.paddingLine)

    //   // console.log('CALC NEED TO UP', offsetY)

    //   return droppedOffsetY
    // }

    return offsetY
  }

  private onAnimate(timestamp: number, params: EngineAnimateParams) {
    this.deltaTopOffset += params.playerProgress.speed

    // if (this.deltaTopOffset >= this.specs.height) {
    //   console.log(
    //     'this.deltaTopOffset',
    //     this.deltaTopOffset % this.specs.height
    //   )

    //   this.deltaTopOffset = 0
    // }

    this.drawLines()
  }

  private createLine(key: string, offsetY: number) {
    const lineObject = new LineObject(key, this.canvasApi, {
      x: this.specs.width / 2 - this.specs.widthLine / 2,
      y: offsetY,
      width: this.specs.widthLine,
      height: this.specs.heightLine,
    })

    return lineObject
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine.eventEmitter.on(EngineEvent.ANIMATE, this.onAnimate.bind(this))
  }

  public drawLines() {
    if (this.lines.length > 0) {
      this.lines.forEach((lineObject, index) => {
        lineObject.clear()

        lineObject.draw({
          y: this.calculateOffsetY(index, lineObject.getSpecs().y),
        })
      })
    } else {
      this.lines = Array.from({
        length: this.specs.countLines,
      }).map((_, index) => {
        const offsetY =
          this.specs.height -
          (this.specs.heightLine + this.specs.paddingLine) * index +
          this.deltaTopOffset

        return this.createLine(`line-center-${index}`, offsetY)
      })
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

    if (this.canvasApi.ctx) {
      this.drawLines()
    }
  }
}
