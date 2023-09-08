import { canvas } from '@/utils'
import { CodeBustersEngine } from '@/engine'
import BaseObject from '@/engine/Objects/Base'
import { INITIAL_SPECS } from './const'
import { BackgroundObjectSpecs } from './types'

export default class BackgroundObject extends BaseObject<BackgroundObjectSpecs> {
  constructor(
    key: string,
    canvasApi: ReturnType<typeof canvas>,
    initialSpecs: Partial<BackgroundObjectSpecs> = {}
  ) {
    super(key, canvasApi, { ...INITIAL_SPECS, ...initialSpecs })
  }

  public bindEngine(engine: CodeBustersEngine) {
    this.engine = engine
  }

  public drawBackground() {
    if (this.canvasApi.ctx && this.specs) {
      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.drawImage(
        this.specs.image,
        this.specs.x,
        this.specs.y,
        this.specs.width,
        this.specs.height
      )
    }
  }

  public draw(specs: BackgroundObjectSpecs) {
    this.specs = { ...this.specs, ...specs }

    this.clear()
    this.drawBackground()
  }
}
