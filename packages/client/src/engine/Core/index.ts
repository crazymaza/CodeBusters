import {
  CodeBustersEngineOptions,
  CodeBustersEngineProcess,
  RunMethodOptions,
} from './types'
import { CarObject, TrackObject } from '@/engine/Objects'
import { CarObjectSpecs } from '@/engine/Objects/Car/types'
import BarrierObject from '@/engine/Objects/Barrier'
import BackgroundObject from '@/engine/Objects/Background'
import { isFunction } from '@/helpers'

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

const FPS = 60
const SECOND = 1000

const initPlayerProgress = {
  speed: 0,
  distance: 0,
  playTime: 0, // В секундах
  scores: 0,
}

export default class CodeBustersEngine {
  static startSpeed = 5
  static maxSpeed = 30
  static diffSpeed = 2 // На сколько  увеличивается скорость в секунду

  private intervalId: NodeJS.Timer | null = null
  private sessionId = 0
  private lastTimestamp = 0
  private trackObjectsTopOffset = 0
  private backgroundObjectTopOffset = 0
  private boundaryTrackTopOffset = 0
  private process: CodeBustersEngineProcess = CodeBustersEngineProcess.STOP

  private playerProgress = initPlayerProgress

  constructor(private options: CodeBustersEngineOptions<CodeBustersEngine>) {
    this.onKeyboardEvent = this.onKeyboardEvent.bind(this)

    this.lastTimestamp = 0

    this.addKeyboardListeners()
  }

  public getPlayerProgress() {
    return this.playerProgress
  }

  public getProcess() {
    return this.process
  }

  public getEngineObjects() {
    return this.options.objects
  }

  public run(options?: RunMethodOptions) {
    if (this.process === CodeBustersEngineProcess.PLAY) {
      return
    }

    this.process = CodeBustersEngineProcess.PLAY

    if (!options?.isResume) {
      this.playerProgress.speed = CodeBustersEngine.startSpeed
    }

    this.options.objects.forEach(object => {
      if (object instanceof CarObject) {
        // Подключение управления машиной
        object.addListeners()
      }
    })

    this.intervalId = setInterval(() => {
      // Увеличение скорости с интервалом в 1с
      if (this.playerProgress.speed < CodeBustersEngine.maxSpeed) {
        this.playerProgress.speed += CodeBustersEngine.diffSpeed
      } else {
        clearInterval(this.intervalId as NodeJS.Timer)
      }
    }, SECOND)

    this.animation(options?.isResume ? this.lastTimestamp : 0)

    this.onChangeProcess()

    if (isFunction(this.options.onRun)) {
      this.options.onRun(this)
    }
  }

  public pause() {
    if (this.process === CodeBustersEngineProcess.PAUSE) {
      return
    }

    this.process = CodeBustersEngineProcess.PAUSE

    // Отключение управления
    this.options.objects.forEach(object => {
      if (object instanceof CarObject) {
        object.removeListeners()
      }
    })

    // Сбрасывание счетчиков
    this.dropCounters()

    this.onChangeProcess()
  }

  public stop() {
    if (this.process === CodeBustersEngineProcess.STOP) {
      return
    }

    this.process = CodeBustersEngineProcess.STOP

    this.options.objects.forEach(object => {
      // Восстановление первоначального состояние объектов
      if (object instanceof TrackObject) {
        this.trackObjectsTopOffset = 0

        object.clear()
        object.drawTrack()
        object.drawBoundary(this.trackObjectsTopOffset)
        object.drawLines(this.trackObjectsTopOffset)
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
    this.dropCounters()

    this.onChangeProcess()

    if (isFunction(this.options.onStop)) {
      this.options.onStop(this)
    }
  }

  public animation(timestamp: number) {
    let isContinue = true // Флаг для прерывание анимации

    // Сбрасываем процесс игры, если timestamp = 0
    if (timestamp === 0) {
      this.dropPlayerProgress()
    }

    const delta = timestamp - this.lastTimestamp

    const deltaFrame = Math.round(SECOND / FPS - delta)

    this.lastTimestamp = timestamp

    this.playerProgress.playTime += 1 / FPS

    // Добавил счетчик дистанции, предположительно для смены уровня и счета очков
    this.playerProgress.distance =
      this.playerProgress.speed * this.playerProgress.playTime

    // Пока что очки считаются как сумма пройденной дистанции и времени
    this.playerProgress.scores = Math.floor(
      this.playerProgress.distance + this.playerProgress.playTime
    )

    this.options.objects.forEach(object => {
      if (object instanceof BackgroundObject) {
        this.backgroundObjectTopOffset += this.playerProgress.speed

        object.clear()
        object.drawBackground(this.backgroundObjectTopOffset)
      }

      if (object instanceof TrackObject) {
        this.trackObjectsTopOffset += this.playerProgress.speed
        this.boundaryTrackTopOffset += this.playerProgress.speed

        object.clear()
        object.drawTrack()
        object.drawBoundary(this.trackObjectsTopOffset)
        object.drawLines(this.trackObjectsTopOffset)
      }

      if (object instanceof BarrierObject) {
        object.clear()

        const barrierYCoordinate =
          this.trackObjectsTopOffset % BarrierObject.currentSpec.trackHeight

        object.setBarrierYAxis(barrierYCoordinate)

        if (barrierYCoordinate >= 0 && barrierYCoordinate <= 10) {
          object.setBarrierXAxis(
            Math.floor(
              Math.random() *
                (TrackObject.width -
                  TrackObject.boundarySpecs.width * 2 -
                  BarrierObject.currentSpec.width)
            )
          )
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
            CarObject.dimensions.width

        const xRangePositionCar = [
          xPositionCar,
          xPositionCar + CarObject.dimensions.width,
        ]

        const yRangePositionCar = [
          CarObject.dimensions.yAxisPosition,
          BarrierObject.currentSpec.trackHeight,
        ]

        const xRangePositionBarrier = [
          BarrierObject.currentSpec.x,
          BarrierObject.currentSpec.x + BarrierObject.currentSpec.width,
        ]

        const yRangePositionBarrier = [
          BarrierObject.currentSpec.y,
          BarrierObject.currentSpec.y + BarrierObject.currentSpec.height,
        ]

        const isIntersectionByX =
          xRangePositionCar[0] < xRangePositionBarrier[1] &&
          xRangePositionBarrier[0] < xRangePositionCar[1]

        const isIntersectionByY =
          yRangePositionBarrier[0] < yRangePositionCar[1] &&
          yRangePositionCar[0] < yRangePositionBarrier[1]

        const isCarBreakOfBarrier = isIntersectionByX && isIntersectionByY

        if (isOutLeftSideTrack || isOutRightSideTrack || isCarBreakOfBarrier) {
          alert('Столкновение!')
          isContinue = false
          this.stop()
        }
      }
    })

    if (isContinue) {
      this.sessionId = requestAnimationFrame(this.animation.bind(this))

      if (isFunction(this.options.onAnimate)) {
        this.options.onAnimate(this)
      }
    }
  }

  private dropPlayerProgress() {
    // Создаем новую ссылку на объект прогрессв игрока, для сброса кеша в requestAnimationFrame
    this.playerProgress = { ...initPlayerProgress }
  }

  private dropCounters() {
    clearInterval(this.intervalId as NodeJS.Timer)
    cancelAnimationFrame(this.sessionId)
  }

  private onChangeProcess() {
    if (isFunction(this.options.onChangeProcess)) {
      this.options.onChangeProcess(this)
    }
  }

  private onKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Space') {
      this.process === CodeBustersEngineProcess.PLAY ? this.pause() : this.run()
    }
  }

  private addKeyboardListeners() {
    document.addEventListener('keydown', this.onKeyboardEvent)
  }

  private removeKeyboardListeners() {
    document.removeEventListener('keydown', this.onKeyboardEvent)
  }
}
