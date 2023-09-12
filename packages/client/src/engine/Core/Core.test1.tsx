import CodeBustersEngine from './index'
import { CarObject, TrackObject } from '../Objects'
import { JSDOM } from 'jsdom'
import 'jest-canvas-mock'

global.document = new JSDOM('') as any
global.window = document.defaultView as any
global.Image = window.Image

jest
  .spyOn(window, 'alert')
  .mockImplementation(() => console.log('alert called'))

describe('Тест игрового движка', () => {
  const createTestEngine = () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    const trackObject = new TrackObject('track', { ctx, element: canvas })

    const carObject = new CarObject('car', { ctx, element: canvas })

    const trackSpecs = trackObject.getSpecs()

    const carSpecs = carObject.getSpecs()

    trackObject.draw()

    carObject.draw({
      image: new Image(),
      x: trackSpecs.width / 2 - carSpecs.positionWidth / 2,
    })

    const engine = new CodeBustersEngine()

    engine.addObject(trackObject).addObject(carObject)

    return {
      engine,
      carObject,
      trackObject,
    }
  }

  test('Создается экземпляр движка', () => {
    const { engine } = createTestEngine()

    if (engine) {
      const process = engine.getProcess()

      expect(process).toBe('stop')
    }
  })

  test('Движок не пересоздает объекты отрисовки во время работы', () => {
    const { engine } = createTestEngine()

    if (engine) {
      const beforeRunTrackObject = engine.getGameObject('track')
      const beforeRunCarObject = engine.getGameObject('car')

      engine.start()

      const afterRunTrackObject = engine.getGameObject('track')
      const afterRunCarObject = engine.getGameObject('car')

      expect(beforeRunCarObject).toEqual(afterRunCarObject)
      expect(beforeRunTrackObject).toEqual(afterRunTrackObject)
    }
  })

  test('Вызывается анимация при методе RUN', () => {
    const { engine } = createTestEngine()

    const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')

    engine.start()

    const process = engine.getProcess()

    expect(process).toBe('play')

    expect(requestAnimationFrameSpy).toBeCalled()
  })

  test('Прерывается анимация при методе STOP', () => {
    const { engine } = createTestEngine()

    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame')

    engine.start()

    const processAfterStart = engine.getProcess()

    expect(processAfterStart).toBe('play')

    engine.stop()

    const processAfterStop = engine.getProcess()

    expect(processAfterStop).toBe('stop')

    expect(cancelAnimationFrameSpy).toBeCalled()
  })
})
