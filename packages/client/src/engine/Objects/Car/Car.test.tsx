import CarObject from '.'
import 'jest-canvas-mock'

describe('Тест объекта Car', () => {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
  })

  test('Canvas вызывает функцию отрисовки объекта Car', () => {
    if (canvas && ctx) {
      const ctxDrawImageSpy = jest.spyOn(ctx, 'drawImage')
      const Car = new CarObject({ ctx, element: canvas })
      const xPositionCar = Car.getCenterOnTrack(500)
      const specs = CarObject.createBaseCarSpecs('', xPositionCar, 0)
      Car.draw(0, specs)
      expect(ctxDrawImageSpy).toBeCalled()
    }
  })
})
