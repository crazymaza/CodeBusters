export interface BaseObjectSpecs {
  x: number
  y: number
  width: number
  height: number
  fill: string
}

export default class BaseObject<TObjectSpecs extends BaseObjectSpecs> {
  constructor(
    protected ctx: CanvasRenderingContext2D,
    protected specs: TObjectSpecs
  ) {
    return this
  }

  public drawRect(specs?: Partial<TObjectSpecs>) {
    const updateSpecs = { ...this.specs, ...specs }

    this.specs = updateSpecs

    return this.ctx.fillRect(
      this.specs.x,
      this.specs.y,
      this.specs.width,
      this.specs.height
    )
  }

  public getSpecs() {
    return this.specs
  }
}
