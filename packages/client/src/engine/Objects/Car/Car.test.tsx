import CarObject from '.'
import 'jest-canvas-mock'

describe('Тест объекта Car', () => {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null

  const createTestCar = () => {
    if (canvas && ctx) {
      const Car = new CarObject({ ctx, element: canvas })
      const xPositionCar = Car.getCenterOnTrack(500)
      const specs = CarObject.createBaseCarSpecs('', xPositionCar, 0, 10)
      Car.draw(0, specs)

      return Car
    }

    return null
  }

  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
  })

  test('Canvas вызывает функцию отрисовки объекта Car', () => {
    if (canvas && ctx) {
      const ctxDrawImageSpy = jest.spyOn(ctx, 'drawImage')
      const Car = createTestCar()
      if (Car) {
        expect(ctxDrawImageSpy).toBeCalled()
      }
    }
  })

  test('Объект возвращает характеристики после рендера', () => {
    if (canvas && ctx) {
      const Car = createTestCar()
      if (Car) {
        expect(Car.getSpecs()).not.toBeNull()
      }
    }
  })
})
