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
  EngineIntersection,
} from './types'

/*
 * @INFO CodeBustersEngine v0.1.0 ;)
 *
 * Движок игры реализует работу с анимацией с помощью canvas api;
 * Логика обновления кадров обрабатывается в методе animation;
 * Движок может работать с множеством объектов, в которых описаны инструкции
 * по их отрисовке. Благодаря шине событий,
 * каждый объект может подключаться к дивжку с помощью метода addObject().
 * Внутри объект должен реализовать абстрактный метод bindEngine().
 * Для управления процессом игры есть несколько методов - start(), pause(), stop() и end()
 * При старте начинают двигаться границы трека, создавая ощущение скорости,
 * которая увеличивается с определенной периодичностью.
 * Добавлены доп.препятствия. На данный момент игра останавливается, если
 * на странице игры нажать на кнопку "Завершить игру",
 * врезавшись в препятствие или если закончится бензин. Если заехать на границы трека, то
 * скорость будет замедляться, а также очки игрока начнут списываться.
 * При достижении максимальной скорости - управление становится менее отзывчивым,
 * а машина смещается на определенное расстояние к вверху экрана,
 * для увеличения сложности игры. Добавлено управление машиной
 * стрелки клавиатуры - влево, вправо, вниз (тормоз) и пауза - пробел
 *
 */

export default class CodeBustersEngine {
  private eventEmitter = new EventBus<EngineEventType>()

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

    this.bindEventsHandlers()

    this.subscribeOnEvents()

    this.addKeyboardListeners()
  }

  public addObject<TGameObject extends BaseGameObjectType>(
    gameObject: TGameObject
  ) {
    gameObject.bindEngine(this)

    this.gameObjects[gameObject.key] = gameObject

    return this
  }

  public getProcess() {
    return this.process
  }

  public getParams() {
    return {
      engineProgress: this.engineProgress,
      playerProgress: this.playerProgress,
      gameParams: this.gameParams,
    }
  }

  public getGameObject<TGameObject>(key: string): TGameObject {
    return this.gameObjects[key] as TGameObject
  }

  public setSpeed(updatedSpeed: number) {
    this.playerProgress.speed = updatedSpeed

    if (this.engineProgress.intervalId === null) {
      this.addSpeedProgress()
    }
  }

  public setTimeLeft(updatedTimeLeft: number) {
    this.playerProgress.timeLeft = updatedTimeLeft
  }

  public subscribe(engineEvent: EngineEventType, callback: EventCallback) {
    this.eventEmitter.on(engineEvent, callback)

    return this
  }

  public unsubscribe(engineEvent: EngineEventType, callback: EventCallback) {
    this.eventEmitter.off(engineEvent, callback)

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

  public end() {
    this.eventEmitter.emit(EngineEvent.END)
  }

  public intersection(intersectionType: EngineIntersection) {
    this.eventEmitter.emit(EngineEvent.INTERSECTION, intersectionType)
  }

  public destroy() {
    this.eventEmitter.emit(EngineEvent.DESTROY)
  }

  public changeProcess(updatedProcess: EngineProcess) {
    this.eventEmitter.emit(EngineEvent.CHANGE_PROCESS, updatedProcess)
  }

  private animate(timestamp: number) {
    this.eventEmitter.emit(EngineEvent.ANIMATE, timestamp, {
      playerProgress: this.playerProgress,
      engineProgress: this.engineProgress,
      gameParams: this.gameParams,
    })
  }

  private keyboardListener(event: KeyboardEvent) {
    this.eventEmitter.emit(EngineEvent.KEY_DOWN, event)
  }

  private addSpeedProgress() {
    this.engineProgress.intervalId = setInterval(() => {
      // Увеличение скорости с интервалом в 1с
      if (this.playerProgress.speed < this.gameParams.maxSpeed) {
        this.playerProgress.speed += this.gameParams.diffSpeed
      } else {
        clearInterval(this.engineProgress.intervalId as NodeJS.Timer)

        this.engineProgress.intervalId = null
      }
    }, SECOND)
  }

  private onStart(options?: EngineStartMethodOptions) {
    if (this.process === EngineProcess.PLAY) {
      return
    }

    this.changeProcess(EngineProcess.PLAY)

    if (!options?.isResume) {
      this.dropPlayerProgress()
    }

    this.addSpeedProgress()

    this.animate(options?.isResume ? this.engineProgress.timestamp : 0)
  }

  private onPause() {
    if (this.process === EngineProcess.PAUSE) {
      return
    }

    // Сбрасывание счетчиков
    this.dropCounters()

    this.changeProcess(EngineProcess.PAUSE)
  }

  private onStop() {
    if (this.process === EngineProcess.STOP) {
      return
    }

    // Сбрасывание счетчиков
    this.dropCounters()

    this.changeProcess(EngineProcess.STOP)
  }

  private onEnd() {
    this.dropCounters()

    this.changeProcess(EngineProcess.END)
  }

  private onChangeProcess(updatedProcess: EngineProcess) {
    this.process = updatedProcess
  }

  private onAnimate(timestamp: number) {
    let isContinue = true // Флаг для прерывание анимации

    // Сбрасываем процесс игры, если timestamp = 0
    if (timestamp === 0) {
      this.dropPlayerProgress()
    }

    this.engineProgress.timestamp = timestamp

    this.playerProgress.playTime += 1 / FPS
    this.playerProgress.timeLeft = this.playerProgress.timeLeft - 1 / FPS

    // Если закончилось время
    if (this.playerProgress.timeLeft <= 0) {
      isContinue = false

      this.eventEmitter.emit(EngineEvent.END)
    } else {
      // Сохраняем разницу по времени между кадоами
      this.engineProgress.frame = Math.round(
        SECOND / FPS - timestamp - this.engineProgress.timestamp
      )

      // Добавил счетчик дистанции, предположительно для смены уровня и счета очков
      this.playerProgress.distance =
        this.playerProgress.speed * this.playerProgress.playTime

      // Пока что очки считаются как сумма пройденной дистанции и времени
      this.playerProgress.scores = Math.floor(
        this.playerProgress.distance + this.playerProgress.playTime
      )
    }

    if (this.process === EngineProcess.END) {
      isContinue = false
    }

    if (isContinue) {
      this.engineProgress.sessionId = requestAnimationFrame(
        this.animate.bind(this)
      )
    }
  }

  private onIntersection(intersectionType: EngineIntersection) {
    switch (intersectionType) {
      default:
        break
    }
  }

  private onDestroy() {
    this.end()
    this.removeKeyboardListeners()
    this.subscribeOnEvents('off')
  }

  private onKeyboardAction(event: KeyboardEvent) {
    if (event.key === 'Space' && event.type === 'keydown') {
      this.process === EngineProcess.PLAY ? this.pause() : this.start()
    }
  }

  private dropPlayerProgress() {
    // Создаем новую ссылку на объект прогрессв игрока, для сброса кеша в requestAnimationFrame
    this.playerProgress = {
      speed: INITIAL_GAME_PARAMS.startSpeed,
      timeLeft: INITIAL_PLAYER_PROGRESS.timeLeft,
      scores: 0,
      distance: 0,
      playTime: 0,

      ...this?.options?.playerProgress,
    }
  }

  private dropCounters() {
    clearInterval(this.engineProgress.intervalId as NodeJS.Timer)
    cancelAnimationFrame(this.engineProgress.sessionId)
  }

  private addKeyboardListeners() {
    document.addEventListener('keydown', this.keyboardListener)
    document.addEventListener('keyup', this.keyboardListener)
    document.addEventListener('keypress', this.keyboardListener)
  }

  private removeKeyboardListeners() {
    document.removeEventListener('keydown', this.keyboardListener)
    document.removeEventListener('keyup', this.keyboardListener)
    document.removeEventListener('keypress', this.keyboardListener)
  }

  private bindEventsHandlers() {
    this.onStart = this.onStart.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onChangeProcess = this.onChangeProcess.bind(this)
    this.onAnimate = this.onAnimate.bind(this)
    this.onIntersection = this.onIntersection.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
    this.keyboardListener = this.keyboardListener.bind(this)
  }

  private subscribeOnEvents(action: 'on' | 'off' = 'on') {
    this.eventEmitter[action](EngineEvent.START, this.onStart)
    this.eventEmitter[action](EngineEvent.PAUSE, this.onPause)
    this.eventEmitter[action](EngineEvent.STOP, this.onStop)
    this.eventEmitter[action](EngineEvent.END, this.onEnd)
    this.eventEmitter[action](EngineEvent.ANIMATE, this.onAnimate)
    this.eventEmitter[action](EngineEvent.CHANGE_PROCESS, this.onChangeProcess)
    this.eventEmitter[action](EngineEvent.INTERSECTION, this.onIntersection)
    this.eventEmitter[action](EngineEvent.KEY_DOWN, this.onKeyboardAction)
    this.eventEmitter[action](EngineEvent.KEY_UP, this.onKeyboardAction)
    this.eventEmitter[action](EngineEvent.KEY_PRESS, this.onKeyboardAction)
    this.eventEmitter[action](EngineEvent.DESTROY, this.onDestroy)
  }
}
