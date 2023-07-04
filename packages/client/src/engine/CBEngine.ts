import { canvas } from '@/utils'
import { CBEngineOptions, CBEngineObjects } from './types'

// CodeBusters Engine v0.0.1 ;)
export default class CBEngine {
  private canvasApi: ReturnType<typeof canvas>
  private objects: CBEngineObjects

  constructor(
    canvasElement: HTMLCanvasElement,
    objects: CBEngineObjects,
    option?: CBEngineOptions
  ) {
    this.canvasApi = canvas(canvasElement, option?.canvasOptions)
    this.objects = objects

    console.log(this.objects)
  }

  public animation() {
    this.clear()
  }

  public getCanvasApi() {
    return this.canvasApi
  }

  public getCanvasElement() {
    return this.canvasApi.element
  }

  public getObjects() {
    return this.objects
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
