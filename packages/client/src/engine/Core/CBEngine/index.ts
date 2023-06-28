import { canvas } from '@/utils'
import { CBEngineOptions } from './types'

/*
 * @INFO CodeBustersEngine v0.0.1 ;)
 *
 * Движок игры реализует работу с анимацией с помощью canvas api;
 * Логика обновления кадров обрабатывается в методе animation;
 */

export default class CBEngine {
  private canvasApi: ReturnType<typeof canvas>
  private fps = 0

  constructor(canvasElement: HTMLCanvasElement, option?: CBEngineOptions) {
    this.canvasApi = canvas(canvasElement, option?.canvasOptions)
  }

  public setFPS(fps: number) {
    this.fps = fps
  }

  public getFFS() {
    return this.fps
  }

  public run(timestamp: number) {
    console.log('RUN')

    this.animation(timestamp)
  }

  public stop() {
    console.log('STOP')
  }

  private animation(timestamp: number) {
    this.clear()
  }

  private clear() {
    this.canvasApi.ctx?.clearRect(
      0,
      0,
      this.canvasApi.element.width,
      this.canvasApi.element.height
    )
  }
}
