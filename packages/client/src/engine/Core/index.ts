import { canvas } from '@/utils'
import { CBEngineOptions } from './types'

/*
 * @INFO CodeBustersEngine v0.0.1 ;)
 *
 * Движок игры реализует работу с анимацией с помощью canvas api;
 * Логика обновления кадров обрабатывается в методе animation;
 */

export default class CBEngine {
  private objects: any[] = []
  private lastTimestamp = performance.now()
  private fps = 0

  constructor(
    private canvasApi: ReturnType<typeof canvas>,
    private options?: CBEngineOptions
  ) {
    this.options?.objects?.forEach(object => {
      this.objects.push(new object.instance(this.canvasApi, object.specs))
    })
  }

  public setFPS(fps: number) {
    this.fps = fps
  }

  public getFFS() {
    return this.fps
  }

  public run() {
    console.log('RUN')

    requestAnimationFrame(this.animation)
  }

  public stop() {
    console.log('STOP')
  }

  private animation(timestamp: number) {
    const deltaTime = timestamp - this.lastTimestamp

    this.lastTimestamp = timestamp

    this.objects.forEach(object => {
      object.redraw(this.canvasApi, deltaTime)
    })

    requestAnimationFrame(this.animation)
  }
}
