import { CBEngineOptions } from './types'
import { TrackObject } from '@/engine/Objects'

/*
 * @INFO CodeBustersEngine v0.0.1 ;)
 *
 * Движок игры реализует работу с анимацией с помощью canvas api;
 * Логика обновления кадров обрабатывается в методе animation;
 */

export default class CBEngine {
  private sessionId = 0
  private lastTimestamp = 0
  private fps = 0

  constructor(private options: CBEngineOptions) {
    this.lastTimestamp = performance.now()

    return this
  }

  public setFPS(fps: number) {
    this.fps = fps
  }

  public getFFS() {
    return this.fps
  }

  public run() {
    console.log('RUN')

    this.animation(performance.now())
  }

  public stop() {
    console.log('STOP')

    cancelAnimationFrame(this.sessionId)
  }

  public animation(timestamp: number) {
    const deltaTime = timestamp - this.lastTimestamp

    this.lastTimestamp = timestamp

    this.options.objects.forEach(object => {
      const prevSpecs = object.getSpecs()

      if (object instanceof TrackObject) {
        object.drawBoundary(deltaTime * 2)
        // console.log('OBJECT', object)
      }
    })

    this.sessionId = requestAnimationFrame(this.animation.bind(this))
  }
}
