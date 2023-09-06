import BaseObject from './_index'
import { BaseObjectSpecs } from './_types'
import 'jest-canvas-mock'

class DummyClass extends BaseObject<BaseObjectSpecs> {
  public updateSpecs(
    newSpecs: Partial<BaseObjectSpecs>,
    callback?:
      | ((
          prevSpecs: BaseObjectSpecs,
          newSpecs: Partial<BaseObjectSpecs>
        ) => BaseObjectSpecs)
      | undefined
  ) {
    return super.updateSpecs(newSpecs, callback)
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
      const dummyInstance = new DummyClass({ ctx, element: canvas })
      expect(dummyInstance.getSpecs()).toBeNull()
      dummyInstance.draw(1, specs)
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
    const callback = jest.fn()

    if (canvas && ctx) {
      const dummyInstance = new DummyClass({ ctx, element: canvas })
      dummyInstance.draw(1, oldArgs)

      expect(dummyInstance.getSpecs()?.width).toBe(oldArgs.width)
      dummyInstance.updateSpecs(newArgs, callback)
      expect(dummyInstance.getSpecs()?.width).toBe(newArgs.width)
    }
  })
})
