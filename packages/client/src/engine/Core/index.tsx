import EventBus, { EventCallback } from '@/engine/EventBus'
import { BaseGameObjectType } from '@/engine/Objects/Base'
import {
  INITIAL_ENGINE_PROGRESS,
  INITIAL_GAME_PARAMS,
  INITIAL_PLAYER_PROGRESS,
  SECOND,
  FPS,
} from './const'
import {
  EngineEvent,
  EngineEventType,
  EngineOptions,
  EngineProcess,
  EngineProgressType,
  EngineGameParamsType,
  EnginePlayerProgressType,
  EngineStartMethodOptions,
} from './types'

export default class CodeBustersEngine {
  public eventEmitter = new EventBus<EngineEventType>()

  private gameObjects: Record<string, BaseGameObjectType> = {}

  private process: EngineProcess = EngineProcess.STOP

  private engineProgress: EngineProgressType = INITIAL_ENGINE_PROGRESS
  private playerProgress: EnginePlayerProgressType = INITIAL_PLAYER_PROGRESS
  private gameParams: EngineGameParamsType = INITIAL_GAME_PARAMS

  constructor(private options?: EngineOptions) {
    if (options) {
      this.gameParams = { ...this.gameParams, ...this?.options?.gameParams }
      this.playerProgress = {
        ...this.playerProgress,
        ...this?.options?.playerProgress,
      }
    }

    this.eventEmitter.on(EngineEvent.START, this.onStart.bind(this))

    this.eventEmitter.on(EngineEvent.PAUSE, this.onPause.bind(this))

    this.eventEmitter.on(EngineEvent.STOP, this.onStop.bind(this))

    this.eventEmitter.on(
      EngineEvent.CHANGE_PROCESS,
      this.onChangeProcess.bind(this)
    )

    this.eventEmitter.on(EngineEvent.ANIMATE, this.onAnimate.bind(this))

    this.eventEmitter.on(EngineEvent.DESTROY, this.onDestroy.bind(this))

    this.eventEmitter.on(
      EngineEvent.INTERSECTION,
      this.onIntersection.bind(this)
    )

    this.eventEmitter.on(EngineEvent.PRESS_KEY, this.onPressKey.bind(this))

    this.keyboardListener = this.keyboardListener.bind(this)

    this.addKeyboardListeners()
  }

  public addObject<TGameObject extends BaseGameObjectType>(
    gameObject: TGameObject
  ) {
    gameObject.bindEngine(this)

    this.gameObjects[gameObject.key] = gameObject

    return this
  }

  public getGameObject<TGameObject>(key: string): TGameObject {
    return this.gameObjects[key] as TGameObject
  }

  public subscribe(listener: {
    engineEvent: EngineEventType
    callback: EventCallback
  }) {
    this.eventEmitter.on(listener.engineEvent, listener.callback)

    return this
  }

  public start(options?: EngineStartMethodOptions) {
    this.eventEmitter.emit(EngineEvent.START, options)
  }

  public pause() {
    this.eventEmitter.emit(EngineEvent.PAUSE)
  }

  public stop() {
    this.eventEmitter.emit(EngineEvent.STOP)
  }

  public destroy() {
    this.eventEmitter.emit(EngineEvent.DESTROY)
  }

  private animate(timestamp: number) {
    this.eventEmitter.emit(EngineEvent.ANIMATE, timestamp, {
      playerProgress: this.playerProgress,
      engineProgress: this.engineProgress,
      gameParams: this.gameParams,
    })
  }

  private changeProcess(updatedProcess: EngineProcess) {
    this.eventEmitter.emit(EngineEvent.CHANGE_PROCESS, updatedProcess)
  }

  private intersection(...args: unknown[]) {
    this.eventEmitter.emit(EngineEvent.INTERSECTION, ...args)
  }

  private keyboardListener(...args: unknown[]) {
    this.eventEmitter.emit(EngineEvent.PRESS_KEY, ...args)
  }

  private onStart(options?: EngineStartMethodOptions) {
    console.log('start')
    if (this.process === EngineProcess.PLAY) {
      return
    }

    if (!options?.isResume) {
      this.playerProgress.speed = this.gameParams.startSpeed
    }

    // this.options.objects.forEach(object => {
    //   if (object instanceof CarObject) {
    //     // Подключение управления машиной
    //     object.addListeners()
    //   }

    //   if (object instanceof EndGameMessageObject) {
    //     object.clear()
    //   }
    // })

    this.engineProgress.intervalId = setInterval(() => {
      // Увеличение скорости с интервалом в 1с
      if (this.playerProgress.speed < this.gameParams.maxSpeed) {
        this.playerProgress.speed += this.gameParams.diffSpeed
      } else {
        clearInterval(this.engineProgress.intervalId as NodeJS.Timer)
      }
    }, SECOND)

    this.animate(options?.isResume ? this.engineProgress.timestamp : 0)

    this.changeProcess(EngineProcess.PLAY)
  }

  private onPause() {
    console.log('pause')
    if (this.process === EngineProcess.PAUSE) {
      return
    }

    // Отключение управления
    // this.options.objects.forEach(object => {
    //   if (object instanceof CarObject) {
    //     object.removeListeners()
    //   }
    // })

    // Сбрасывание счетчиков
    this.dropCounters()

    this.changeProcess(EngineProcess.PAUSE)
  }

  private onStop() {
    console.log('stop')
    if (this.process === EngineProcess.STOP) {
      return
    }

    // this.options.objects.forEach(object => {
    //   if (object instanceof EndGameMessageObject) {
    //     object.clear()
    //     object.drawEndGameMessage(this.playerProgress.scores)
    //   }
    //   // Восстановление первоначального состояние объектов
    //   if (object instanceof TrackObject) {
    //     this.trackObjectsTopOffset = 0

    //     object.clear()
    //     object.drawTrack()
    //     object.drawBoundary(this.trackObjectsTopOffset)
    //     object.drawLines(this.trackObjectsTopOffset)
    //   }

    //   if (object instanceof CarObject) {
    //     const prevSpecs = object.getSpecs() as CarObjectSpecs
    //     const xPositionCar = object.getCenterOnTrack(TrackObject.width)

    //     object.clear()
    //     object.draw(0, {
    //       ...prevSpecs,
    //       x: xPositionCar,
    //       y: 0,
    //     })

    //     // Отключение управления
    //     object.removeListeners()
    //   }

    //   if (object instanceof BarrierObject) {
    //     object.clear()
    //     object.setBarrierXAxis(-200)
    //     object.drawBarrier()
    //   }
    // })

    // Сбрасывание счетчиков
    this.dropCounters()

    this.changeProcess(EngineProcess.STOP)
  }

  private onChangeProcess(updatedProcess: EngineProcess) {
    this.process = updatedProcess
  }

  private onAnimate(timestamp: number) {
    console.log('animate')
    //let isContinue = true // Флаг для прерывание анимации

    // Сбрасываем процесс игры, если timestamp = 0
    if (timestamp === 0) {
      this.dropPlayerProgress()
    }

    this.engineProgress.timestamp = timestamp

    this.playerProgress.playTime += 1 / FPS

    // Добавил счетчик дистанции, предположительно для смены уровня и счета очков
    this.playerProgress.distance =
      this.playerProgress.speed * this.playerProgress.playTime

    // Пока что очки считаются как сумма пройденной дистанции и времени
    this.playerProgress.scores = Math.floor(
      this.playerProgress.distance + this.playerProgress.playTime
    )

    if (isContinue) {
      this.engineProgress.sessionId = requestAnimationFrame(
        this.animate.bind(this)
      )
    }
  }

  private onIntersection() {
    console.log('intersection')
  }

  private onDestroy() {
    console.log('destroy')
    this.stop()
    this.removeKeyboardListeners()
  }

  private onPressKey(event: KeyboardEvent) {
    if (event.key === 'Space') {
      this.process === EngineProcess.PLAY ? this.pause() : this.start()
    }
  }

  private addKeyboardListeners() {
    document.addEventListener('keydown', this.keyboardListener)
  }

  private removeKeyboardListeners() {
    document.removeEventListener('keydown', this.keyboardListener)
  }

  private dropPlayerProgress() {
    // Создаем новую ссылку на объект прогрессв игрока, для сброса кеша в requestAnimationFrame
    this.playerProgress = {
      ...this.playerProgress,
      ...this?.options?.playerProgress,
    }
  }

  private dropCounters() {
    clearInterval(this.engineProgress.intervalId as NodeJS.Timer)
    cancelAnimationFrame(this.engineProgress.sessionId)
  }
}
