import { CodeBustersEngineOptions, CodeBustersEngineProcess } from './types'
import { CarObject, TrackObject } from '@/engine/Objects'
import { CarObjectSpecs } from '@/engine/Objects/Car/types'
import BarrierObject from '@/engine/Objects/Barrier'

/*
 * @INFO CodeBustersEngine v0.0.1 ;)
 *
 * Движок игры реализует работу с анимацией с помощью canvas api;
 * Логика обновления кадров обрабатывается в методе animation;
 * Пока движок работает с двумя объектами - трассой (TrackObject) и машиной игрока (CarObject)
 * в которых описаны инструкции по отрисовке соответствующих объектов.
 * Для управления процессом игры пока есть два метода - run() и stop()
 * При старте начинают двигаться границы трека, создавая ощущение скорости,
 * которая увеличивается с определенной периодичностью.
 * В дальнейшем будут добавлены доп.препятствия. На данный момент игра останавливаеться, если
 * на странице игры нажать на кнопку "Сбросить игру" или
 * врезавшись в левую или правую границу трека. Добавлено управление машиной
 * стрелки клавиатуры - влево и вправо.
 *
 */

const SECOND = 1000

export default class CodeBustersEngine {
  static startSpeed = 5
  static maxSpeed = 30
  static diffSpeed = 2 // На сколько  увеличивается скорость в секунду

  private sessionId = 0
  private intervalId: NodeJS.Timer | null = null
  private lastTimestamp = 0
  private boundaryTopOffset = 0
  private speed = CodeBustersEngine.startSpeed
  private process: CodeBustersEngineProcess = CodeBustersEngineProcess.STOP
  private barrierTopOffset = 0

  constructor(private options: CodeBustersEngineOptions) {
    this.lastTimestamp = 0
  }

  public run() {
    if (this.process === CodeBustersEngineProcess.PLAY) {
      return
    }

    this.process = CodeBustersEngineProcess.PLAY

    this.options.objects.forEach(object => {
      if (object instanceof CarObject) {
        // Подключение управления машиной
        object.addListeners()
      }
    })

    this.intervalId = setInterval(() => {
      // Увеличение скорости с интервалом в 1с
      if (this.speed < CodeBustersEngine.maxSpeed) {
        this.speed += CodeBustersEngine.diffSpeed
      } else {
        clearInterval(this.intervalId as NodeJS.Timer)
      }
    }, SECOND)

    this.animation(performance.now())
  }

  public stop() {
    if (this.process === CodeBustersEngineProcess.STOP) {
      return
    }

    this.process = CodeBustersEngineProcess.STOP

    this.speed = CodeBustersEngine.startSpeed

    this.options.objects.forEach(object => {
      // Восстановление первоначального состояние объектов

      if (object instanceof TrackObject) {
        this.boundaryTopOffset = 0

        object.clear()
        object.drawTrack()
        object.drawBoundary(this.boundaryTopOffset)
      }

      if (object instanceof CarObject) {
        const prevSpecs = object.getSpecs() as CarObjectSpecs
        const xPositionCar = object.getCenterOnTrack(TrackObject.width)

        object.clear()
        object.draw(0, {
          ...prevSpecs,
          x: xPositionCar,
          y: 0,
        })

        // Отключение управления
        object.removeListeners()
      }

      if (object instanceof BarrierObject) {
        object.clear()
        object.setBarrierXAxis(-200)
        object.drawBarrier()
      }
    })

    // Сбрасывание счетчиков
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    cancelAnimationFrame(this.sessionId)
  }

  public animation(timestamp: number) {
    let isContinue = true // Флаг для прерывание анимации

    this.lastTimestamp = timestamp

    this.options.objects.forEach(object => {
      if (object instanceof TrackObject) {
        this.boundaryTopOffset += this.speed

        object.clear()
        object.drawTrack()
        object.drawBoundary(this.boundaryTopOffset)
      }

      if (object instanceof BarrierObject) {
        object.clear()
        const barrierYCoordinate =
          this.barrierTopOffset <= document.body.offsetHeight
            ? (this.barrierTopOffset += this.speed)
            : (this.barrierTopOffset = -200)
        object.setBarrierYAxis(barrierYCoordinate)
        if (this.barrierTopOffset === -200) {
          object.setBarrierXAxis(Math.floor(Math.random() * TrackObject.width))
        }
        object.drawBarrier()
      }

      if (object instanceof CarObject) {
        // Прверка на столкновение с левым или правым краем трэка
        const boundarySpecs = TrackObject.boundarySpecs
        const xPositionCar = object.getSpecs()?.x as number
        const isOutLeftSideTrack = xPositionCar <= boundarySpecs.leftOffset
        const isOutRightSideTrack =
          xPositionCar >=
          TrackObject.width -
            boundarySpecs.leftOffset -
            CarObject.dimensions.with

        const isCarBreakOfBarrier =
          xPositionCar >= BarrierObject.currentSpec.x &&
          xPositionCar <=
            BarrierObject.currentSpec.x + BarrierObject.currentSpec.width &&
          BarrierObject.currentSpec.trackHeight -
            30 -
            CarObject.dimensions.height <=
            BarrierObject.currentSpec.y + 170

        if (isOutLeftSideTrack || isOutRightSideTrack || isCarBreakOfBarrier) {
          alert('Столкновение!')
          isContinue = false
          this.stop()
        }
      }
    })

    if (isContinue) {
      this.sessionId = requestAnimationFrame(this.animation.bind(this))
    }
  }
}
