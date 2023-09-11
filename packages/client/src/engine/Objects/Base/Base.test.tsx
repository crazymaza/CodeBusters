import BaseGameObject from './index'
import { BaseGameObjectSpecs } from './types'
import 'jest-canvas-mock'

class DummyClass extends BaseGameObject<BaseGameObjectSpecs> {
  public bindEngine() {
    return true
  }
}

describe('Тест базового класса для объектов игры', () => {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null

  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
  })

  test('Рендерит объект методом draw', () => {
    const specs = {
      x: 1,
      y: 1,
      width: 1,
      height: 1,
    }

    if (canvas && ctx) {
      const dummyInstance = new DummyClass('dummy', { ctx, element: canvas })

      expect(dummyInstance.getSpecs().width).toBeUndefined()

      dummyInstance.draw(specs)

      expect(dummyInstance.getSpecs()?.width).toBe(specs.width)
    }
  })

  test('Обновляет характеристики объекта', () => {
    const oldArgs = {
      x: 1,
      y: 1,
      width: 1,
      height: 1,
    }

    const newArgs = {
      x: 3,
      y: 3,
      width: 3,
      height: 3,
    }

    if (canvas && ctx) {
      const dummyInstance = new DummyClass('dummy', { ctx, element: canvas })

      dummyInstance.draw(oldArgs)

      expect(dummyInstance.getSpecs()?.width).toBe(oldArgs.width)

      dummyInstance.draw(newArgs)

      expect(dummyInstance.getSpecs()?.width).toBe(newArgs.width)
    }
  })
})
