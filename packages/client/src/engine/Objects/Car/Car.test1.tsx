import CarObject from './index'
import 'jest-canvas-mock'

describe('Тест объекта Car', () => {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null

  const createTestCar = () => {
    if (canvas && ctx) {
      const Car = new CarObject('car', { ctx, element: canvas })

      Car.draw({ image: new Image() })

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
