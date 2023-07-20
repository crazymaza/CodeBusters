import BaseObject from '@/engine/Objects/Base'
import { BackgroundObjectSpecs } from './types'

export default class BackgroundObject extends BaseObject<BackgroundObjectSpecs> {
  static dimensions = {
    width: 450,
    height: 500,
  }

  static createBaseBackgroundSpecs(bgImageSrc: string) {
    const bgImage = new Image()
    bgImage.src = bgImageSrc

    return {
      x: 0,
      y: -1000,
      width: 700,
      height: 1400,
      image: bgImage,
    }
  }

  public drawBackground(topOffset = 0) {
    if (this.canvasApi.ctx && this.specs) {
      this.clear()

      this.canvasApi.ctx.beginPath()

      this.canvasApi.ctx.drawImage(
        this.specs.image,
        this.specs.x,
        this.specs.y,
        this.specs.width * 2,
        this.specs.height * 2
      )
      this.specs.y += 5

      if (this.specs.y > 1) {
        this.specs.y = -this.specs.image.height
      }
    }
  }

  public draw(delta: number, specs: BackgroundObjectSpecs) {
    this.specs = specs
    this.drawBackground()
  }
}
