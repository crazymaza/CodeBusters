import { v4 as uuid } from 'uuid'
import { isFunction } from '@/helpers'

export type SessionState = {
  procces: 'game' | 'pause' | 'stop'
  id: string | null
  level: number | null
  timeLeft: number
  distanceLeft: number
}

export type SessionCallback<T = void> = (state: SessionState | null) => T

export type SessionOptions = {
  callback: {
    onStart: SessionCallback
    onPause: SessionCallback
    onStop: SessionCallback
    onTimeLeft: SessionCallback
    onDistanceEnd: SessionCallback
  }
}

const SECOND = 1000

export default class Session {
  private history: SessionState[] = []
  private state: SessionState | null = null
  private timeId: NodeJS.Timer | null = null

  constructor(private options: Partial<SessionOptions> = {}) {
    return this
  }

  public start(level: SessionState['level'], time: number, distance: number) {
    this.setState({
      id: uuid(),
      procces: 'game',
      level,
      timeLeft: time,
      distanceLeft: distance,
    })

    if (this.state) {
      this.history.push(this.state)
    }

    this.updateTimeLeft()

    this.onStart()
  }

  public pause() {
    clearInterval(this.timeId as NodeJS.Timer)

    this.setState({
      procces: 'pause',
    })

    this.onPause()
  }

  public stop() {
    clearInterval(this.timeId as NodeJS.Timer)

    this.setState({
      id: null,
      level: null,
      timeLeft: 0,
      procces: 'stop',
    })

    this.onStop()
  }

  public getState() {
    return this.state
  }

  public getHistory() {
    return this.history
  }

  private setState(state: Partial<SessionState>) {
    this.state = { ...this.state, ...(state as SessionState) }
  }

  private updateTimeLeft() {
    this.timeId = setInterval(() => {
      if (this.state?.timeLeft) {
        this.setState({
          timeLeft: this.state.timeLeft - 1,
          distanceLeft: this.state.distanceLeft - 1,
        })

        if (this.state.distanceLeft === 0) {
          clearInterval(this.timeId as NodeJS.Timer)

          this.onDistanseEnd()
        }

        if (this.state.timeLeft === 0) {
          clearInterval(this.timeId as NodeJS.Timer)
        }

        this.onTimeLeft()

        console.log(this.state)
      }
    }, SECOND)
  }

  private onCallback(callbackName: keyof SessionOptions['callback']) {
    if (isFunction(this.options?.callback?.[callbackName])) {
      return this.options?.callback?.[callbackName](this.state)
    }
  }

  private onStart() {
    this.onCallback('onStart')
  }

  private onPause() {
    this.onCallback('onPause')
  }

  private onStop() {
    this.onCallback('onStop')
  }

  private onTimeLeft() {
    this.onCallback('onTimeLeft')
  }

  private onDistanseEnd() {
    this.onCallback('onDistanceEnd')
  }
}
