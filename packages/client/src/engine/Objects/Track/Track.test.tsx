import TrackObject from '.'
import 'jest-canvas-mock'

describe('Тест объекта Track', () => {
  let canvas: HTMLCanvasElement | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let container: HTMLElement | null = null

  beforeEach(function () {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    container = document.createElement('div')
  })

  test('Canvas вызывает функцию отрисовки объекта Track', () => {
    if (canvas && ctx && container) {
      const ctxFillReactSpy = jest.spyOn(ctx, 'fillRect')
      const Track = new TrackObject({ ctx, element: canvas })
      const baseTrackSpecs = TrackObject.createBaseTrackSpecs(container)
      Track.draw(0, baseTrackSpecs)
      expect(ctxFillReactSpy).toBeCalled()
    }
  })
})
