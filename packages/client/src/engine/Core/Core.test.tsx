import CodeBustersEngine from '.'
import 'jest-canvas-mock'
import { CarObject, TrackObject } from '../Objects'

describe('Тест игрового движка', () => {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let container: HTMLElement | null = null

  const createTestEngine = () => {
    if (canvas && ctx && container) {
      const Track = new TrackObject({ ctx, element: canvas })
      const trackSpecs = TrackObject.createBaseTrackSpecs(container)

      const Car = new CarObject({ ctx, element: canvas })
      const xPositionCar = Car.getCenterOnTrack(500)
      const carSpecs = CarObject.createBaseCarSpecs('', xPositionCar, 0)

      Track.draw(0, trackSpecs)
      Car.draw(0, carSpecs)

      const engine = new CodeBustersEngine({ objects: [Car, Track] })

      return engine
    }

    return null
  }

  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    container = document.createElement('div')
  })

  test('Создается экземпляр движка', () => {
    const engine = createTestEngine()

    if (engine) {
      const process = engine.getProcess()

      expect(process).toBe('stop')
    }
  })

  test('Вызывается анимация при методе RUN', () => {
    const engine = createTestEngine()

    if (engine) {
      const requestAnimationFrameSpy = jest.spyOn(
        window,
        'requestAnimationFrame'
      )

      engine.run()

      const process = engine.getProcess()

      expect(process).toBe('play')
      expect(requestAnimationFrameSpy).toBeCalled()
    }
  })

  test('Прерывается анимация при методе STOP', () => {
    const engine = createTestEngine()

    if (engine) {
      const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame')

      engine.run()

      const processAfterStart = engine.getProcess()
      expect(processAfterStart).toBe('play')

      engine.stop()

      const processAfterStop = engine.getProcess()

      expect(processAfterStop).toBe('stop')
      expect(cancelAnimationFrameSpy).toBeCalled()
    }
  })
})
