import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import {
  EngineEvent,
  EngineAnimateParams,
  EngineIntersection,
} from '@/engine/Core/types'
import { BaseGameObject, LineObject } from '@/engine/Objects'
import { INITIAL_SPECS } from './const'
import { BordersSideObjectSpecs, BordersSide, BordersItem } from './types'

export default class BordersSideObject extends BaseGameObject<BordersSideObjectSpecs> {
  private deltaTopOffset = 0

  private borders: BordersItem[] = []

  private topBorder: LineObject | null = null

  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<BordersSideObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })

    this.onAnimate = this.onAnimate.bind(this)
    this.onIntersection = this.onIntersection.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onDestroy = this.onDestroy.bind(this)

    // Устанавливаем высоту всего контейнера по высоте трека
    this.specs.height = this.canvasApi.element.offsetHeight
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine

    this.engine
      .subscribe(EngineEvent.ANIMATE, this.onAnimate)
      .subscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .subscribe(EngineEvent.END, this.onEnd)
      .subscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private onAnimate(timestamp: number, params: EngineAnimateParams) {
    this.deltaTopOffset = params.playerProgress.speed

    this.drawBorders()
  }

  private onIntersection(intersectionType: EngineIntersection) {
    switch (intersectionType) {
      default:
        break
    }
  }

  private onDestroy() {
    this.engine
      ?.unsubscribe(EngineEvent.ANIMATE, this.onAnimate)
      .unsubscribe(EngineEvent.INTERSECTION, this.onIntersection)
      .unsubscribe(EngineEvent.END, this.onEnd)
      .unsubscribe(EngineEvent.DESTROY, this.onDestroy)
  }

  private calculateOffsetY(index: number, prevOffsetY: number) {
    const lineFullHeight = this.specs.heightLine + this.specs.paddingLine

    // Считаем Y координату сдвига вниз
    const offsetY = prevOffsetY + this.deltaTopOffset

    // Если Y координата ушла за зону игрового поля вниз, перемещаем ее в начало экрана
    // Координаты перемещения берем относительно самой ближней линии к верху экрана
    if (offsetY >= this.specs.height && this.topBorder) {
      const topLineOffsetY = this.topBorder.getSpecs().y
      const topOffsetY = topLineOffsetY - lineFullHeight

      this.topBorder = this.borders[index].left.line

      return topOffsetY
    }

    return offsetY
  }

  private createBorder(
    key: string,
    side: BordersSide,
    isEven: boolean,
    offsetY: number
  ) {
    const lineObject = new LineObject(key, this.canvasApi, {
      x:
        side === BordersSide.LEFT
          ? this.specs.offsetSide
          : this.specs.width - this.specs.widthLine - this.specs.offsetSide,
      y: offsetY,
      width: this.specs.widthLine,
      height: this.specs.heightLine,
      fill: isEven ? this.specs.fillEvent : this.specs.fillOdd,
      round: this.specs.roundLine,
    })

    lineObject.draw()

    return { side, line: lineObject }
  }

  public drawBorders() {
    this.clear()

    if (this.borders.length > 0) {
      this.borders.forEach((border, index) => {
        const currentOffsetY = border.left.line.getSpecs().y

        // Вычисление координат для боковых линий в зависимочти от скорости
        const yAxis = this.calculateOffsetY(index, currentOffsetY)

        border.left.line.draw({
          y: yAxis,
        })
        border.right.line.draw({
          y: yAxis,
        })
      })
    } else {
      this.borders = Array.from(
        {
          length: this.specs.countLines,
        },
        (_, index) => {
          return {
            left: {
              side: BordersSide.LEFT,
              isEven: index % 2 === 0,
            },
            right: {
              side: BordersSide.RIGHT,
              isEven: index % 2 === 0,
            },
          }
        }
      ).map((border, index) => {
        // Постороение начальных координат левых и правых боковых линий
        const offsetY =
          this.specs.height -
          (this.specs.heightLine + this.specs.paddingLine) * (index + 1)

        const left = this.createBorder(
          `${border.left.side}-${index}`,
          BordersSide.LEFT,
          border.left.isEven,
          offsetY
        )

        const right = this.createBorder(
          `${border.right.side}-${index}`,
          BordersSide.RIGHT,
          border.right.isEven,
          offsetY
        )

        return { left, right }
      })

      // Запопинаем самую верхнюю линию
      this.topBorder = this.borders[this.borders.length - 1].left.line
    }
  }

  public draw(specs?: Partial<BordersSideObjectSpecs>) {
    this.specs = { ...this.specs, ...specs }

    if (this.isFirstDraw) {
      this.initialSpecs = this.specs

      this.isFirstDraw = false
    }

    // Считаем сколько линий нужно на треке, исходя из размеров линии и высоты трека
    this.specs.countLines =
      Math.round(
        this.specs.height / (this.specs.heightLine + this.specs.paddingLine)
      ) + 1

    this.drawBorders()
  }
}
