import CodeBustersEngine from './_index'
import { CarObject, TrackObject } from '../Objects'
import { fireEvent } from '@testing-library/react'
import 'jest-canvas-mock'
import BarrierObject from '../Objects/Barrier'

jest
  .spyOn(window, 'alert')
  .mockImplementation(() => console.log('alert called'))

describe('Тест игрового движка', () => {
  const createTestEngine = () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
    const container: HTMLElement = document.createElement('div')

    const Track = new TrackObject({ ctx, element: canvas })
    const trackSpecs = TrackObject.createBaseTrackSpecs(container)

    const Car = new CarObject({ ctx, element: canvas })
    const xPositionCar = Car.getCenterOnTrack(500)
    const carSpecs = CarObject.createBaseCarSpecs('', xPositionCar, 0, 10)

    const barrierImage = ''
    const Barrier = new BarrierObject({ ctx, element: canvas })
    const barrierSpec = BarrierObject.createBaseBarrierSpecs(
      container,
      barrierImage
    )

    Track.draw(0, trackSpecs)
    Car.draw(0, carSpecs)
    Barrier.draw(0, barrierSpec)

    const engine = new CodeBustersEngine({ objects: [Car, Track, Barrier] })

    return {
      engine: engine,
      CarObject: Car,
      TrackObject: Track,
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
      const [beforeRunCarObject, beforeRunTrackObject] =
        engine.getEngineObjects()

      engine.run()

      const [afterRunCarObject, afterRunTrackObject] = engine.getEngineObjects()

      expect(beforeRunCarObject).toEqual(afterRunCarObject)
      expect(beforeRunTrackObject).toEqual(afterRunTrackObject)
    }
  })

  test('Вызывается анимация при методе RUN', () => {
    const { engine } = createTestEngine()

    const requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')

    engine.run()

    const process = engine.getProcess()

    expect(process).toBe('play')
    expect(requestAnimationFrameSpy).toBeCalled()
  })

  test('Прерывается анимация при методе STOP', () => {
    const { engine } = createTestEngine()

    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame')

    engine.run()

    const processAfterStart = engine.getProcess()
    expect(processAfterStart).toBe('play')

    engine.stop()

    const processAfterStop = engine.getProcess()

    expect(processAfterStop).toBe('stop')
    expect(cancelAnimationFrameSpy).toBeCalled()
  })

  test('Перерисовывается объект Car при нажатии стрелки влево', () => {
    const { engine, CarObject } = createTestEngine()

    engine.run()

    const carDrawSpy = jest.spyOn(CarObject, 'draw')

    fireEvent.keyDown(document, { key: 'ArrowLeft', which: 37, keyCode: 37 })

    expect(carDrawSpy).toBeCalled()
  })

  test('Перерисовывается объект Car при нажатии стрелки вправо', () => {
    const { engine, CarObject } = createTestEngine()

    engine.run()

    const carDrawSpy = jest.spyOn(CarObject, 'draw')

    fireEvent.keyDown(document, { key: 'ArrowRight', which: 39, keyCode: 39 })

    expect(carDrawSpy).toBeCalled()
  })
})
