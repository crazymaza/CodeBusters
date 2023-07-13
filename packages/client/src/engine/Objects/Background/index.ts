import BaseObject from '../Base'
import { BackgroundObjectSpecs } from './types'

export default class BackgroundObject extends BaseObject<BackgroundObjectSpecs> {
  private xPosition = 0
  static dimensions = {
    width: 450,
    height: 500,
  }

  static createBasekBackgroundSpecs(
    containerHTML: HTMLElement,
    bgImageSrc: string
  ) {
    const bgImage = new Image()
    bgImage.src = bgImageSrc

    // alert(containerHTML.offsetWidth)

    return {
      x: 0,
      y: 0,
      width: 1400,
      height: 700,
      image: bgImage,
    }
  }

  public drawBackground(topOffset = 0) {
    if (this.canvasApi.ctx && this.specs) {
      this.clear()

      this.canvasApi.ctx.drawImage(
        this.specs.image,
        this.specs.x,
        this.specs.y

        // this.specs.width,
        // this.specs.height
      )
      this.specs.y++
      if (this.specs.y >= 989) {
        this.specs.y = 100
      }
    }
  }

  public draw(delta: number, specs: BackgroundObjectSpecs) {
    this.specs = specs
    this.drawBackground()
  }
}
