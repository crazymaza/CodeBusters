import EventBus, { EventCallback } from '@/engine/EventBus'
import {
  // CodeBustersEngineOptions,
  CodeBustersEngineProcess,
  RunMethodOptions,
} from './types'
import BaseGameObject, {
  BaseGameObjectEvent,
  BaseGameObjectSpecs,
} from '@/engine/Objects/Base/BaseGameObject'

export const FPS = 60

export const SECOND = 1000

export const ENGINE_EVENT = {
  START: '@event-engine-start',
  PAUSE: '@event-engine-pause',
  STOP: '@event-engine-stop',
  CHANGE_PROCESS: '@event-engine-change-process',
  ANIMATE: '@event-engine-animate',
  DESTROY: '@event-engine-destroy',
  INTERSECTION: '@event-engine-intersection', // Событие столкновения с объектом
  PRESS_KEYBOARD: '@event-engine-press-keyboard',
} as const

const INITIAL_GAME_PARAMS = {
  startSpeed: 5,
  maxSpeed: 30,
  diffSpeed: 2,
}

const INITIAL_ENGINE_PROGRESS = {
  intervalId: null,
  sessionId: 0,
  timestamp: 0,
}

const INITIAL_PLAYER_PROGRESS = {
  speed: 0,
  distance: 0,
  playTime: 0, // В секундах
  scores: 0,
}

export type EngineGameParamsType = {
  startSpeed: number
  maxSpeed: number
  diffSpeed: number
}

export type EngineProgressType = {
  intervalId: NodeJS.Timer | null
  sessionId: number
  timestamp: number
}

export type EnginePlayerProgressType = {
  speed: number
  distance: number
  playTime: number
  scores: number
}

export type EngineEventType = typeof ENGINE_EVENT[keyof typeof ENGINE_EVENT]

export type BaseGameObjectType = BaseGameObject<
  BaseGameObjectSpecs,
  BaseGameObjectEvent
>

export type CodeBustersEngineOptions = {
  gameParams?: Partial<EngineGameParamsType>
  playerProgress?: Partial<EnginePlayerProgressType>
}

export default class CodeBustersEngine {
  private eventEmitter = new EventBus<EngineEventType>()

  private gameObjects: BaseGameObjectType[] = []

  private process: CodeBustersEngineProcess = CodeBustersEngineProcess.STOP

  private engineProgress: EngineProgressType = INITIAL_ENGINE_PROGRESS
  private playerProgress: EnginePlayerProgressType = INITIAL_PLAYER_PROGRESS
  private gameParams: EngineGameParamsType = INITIAL_GAME_PARAMS

  constructor(private options?: CodeBustersEngineOptions) {
    if (options) {
      this.gameParams = { ...this.gameParams, ...this?.options?.gameParams }
      this.playerProgress = {
        ...this.playerProgress,
        ...this?.options?.playerProgress,
      }
    }

    this.eventEmitter.on(ENGINE_EVENT.START, this.onStart.bind(this))

    this.eventEmitter.on(ENGINE_EVENT.PAUSE, this.onPause.bind(this))

    this.eventEmitter.on(ENGINE_EVENT.STOP, this.onStop.bind(this))

    this.eventEmitter.on(ENGINE_EVENT.CHANGE_PROCESS, this.onAnimate.bind(this))

    this.eventEmitter.on(ENGINE_EVENT.ANIMATE, this.onAnimate.bind(this))

    this.eventEmitter.on(ENGINE_EVENT.DESTROY, this.onDestroy.bind(this))

    this.eventEmitter.on(
      ENGINE_EVENT.INTERSECTION,
      this.onIntersection.bind(this)
    )

    this.eventEmitter.on(
      ENGINE_EVENT.PRESS_KEYBOARD,
      this.onKeyboard.bind(this)
    )

    this.keyboardListener = this.keyboardListener.bind(this)

    this.addKeyboardListeners()
  }

  public addObject<TGameObject extends BaseGameObjectType>(
    gameObject: TGameObject
  ) {
    this.gameObjects.push(gameObject)
  }

  public subscribe(
    listeners: {
      engineEvent: EngineEventType
      callback: EventCallback
    }[]
  ) {
    listeners.forEach(listener => {
      this.eventEmitter.on(listener.engineEvent, listener.callback)
    })
  }

  public start(options?: RunMethodOptions) {
    this.eventEmitter.emit(ENGINE_EVENT.START, options)
  }

  public pause() {
    this.eventEmitter.emit(ENGINE_EVENT.PAUSE)
  }

  public stop() {
    this.eventEmitter.emit(ENGINE_EVENT.STOP)
  }

  public destroy() {
    this.eventEmitter.emit(ENGINE_EVENT.DESTROY)
  }

  private animate(timestamp: number) {
    this.eventEmitter.emit(ENGINE_EVENT.ANIMATE, timestamp, {
      playerProgress: this.playerProgress,
    })
  }

  private changeProcess(updatedProcess: CodeBustersEngineProcess) {
    this.process = updatedProcess

    this.eventEmitter.emit(ENGINE_EVENT.CHANGE_PROCESS, updatedProcess)
  }

  private intersection(...args: unknown[]) {
    this.eventEmitter.emit(ENGINE_EVENT.INTERSECTION, ...args)
  }

  private keyboardListener(...args: unknown[]) {
    this.eventEmitter.emit(ENGINE_EVENT.PRESS_KEYBOARD, ...args)
  }

  private onStart(options?: RunMethodOptions) {
    console.log('start')
    if (this.process === CodeBustersEngineProcess.PLAY) {
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

    this.changeProcess(CodeBustersEngineProcess.PLAY)
  }

  private onPause() {
    console.log('pause')
    if (this.process === CodeBustersEngineProcess.PAUSE) {
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

    this.changeProcess(CodeBustersEngineProcess.PAUSE)
  }

  private onStop() {
    console.log('stop')
    if (this.process === CodeBustersEngineProcess.STOP) {
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

    this.changeProcess(CodeBustersEngineProcess.STOP)
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

  private onKeyboard(event: KeyboardEvent) {
    if (event.key === 'Space') {
      this.process === CodeBustersEngineProcess.PLAY
        ? this.pause()
        : this.start()
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
