import { CBEngineOptions } from './types'
import { CarObject, TrackObject } from '@/engine/Objects'
import { CarObjectSpecs } from '@/engine/Objects/Car'

/*
 * @INFO CodeBustersEngine v0.0.1 ;)
 *
 * Движок игры реализует работу с анимацией с помощью canvas api;
 * Логика обновления кадров обрабатывается в методе animation;
 */

export default class CBEngine {
  private sessionId = 0
  private lastTimestamp = 0
  private boundaryTrackTopOffset = 0
  private speed = 5

  constructor(private options: CBEngineOptions) {
    this.lastTimestamp = performance.now()

    return this
  }

  public run() {
    console.log('RUN')

    this.options.objects.forEach(object => {
      if (object instanceof CarObject) {
        object.addListeners()
      }
    })

    this.animation(performance.now())
  }

  public stop() {
    console.log('STOP')

    this.options.objects.forEach(object => {
      if (object instanceof CarObject) {
        const prevSpecs = object.getSpecs() as CarObjectSpecs
        const xPositionCar = object.getCenterOnTrack(TrackObject.width)

        object.clear()
        object.draw(0, {
          ...prevSpecs,
          x: xPositionCar,
          y: 0,
        })

        object.removeListeners()
      }

      if (object instanceof TrackObject) {
        this.boundaryTrackTopOffset = 0

        object.clear()
        object.drawTrack()
        object.drawBoundary(this.boundaryTrackTopOffset)
      }
    })

    cancelAnimationFrame(this.sessionId)
  }

  public animation(timestamp: number) {
    const deltaTime = timestamp - this.lastTimestamp

    this.lastTimestamp = timestamp

    this.options.objects.forEach(object => {
      if (object instanceof CarObject) {
        const boundarySpecs = TrackObject.boundarySpecs
        const xPositionCar = object.getSpecs()?.x as number

        const isOutLeftSideTrack = xPositionCar <= boundarySpecs.leftOffset

        const isOutRightSideTrack =
          xPositionCar >=
          TrackObject.width -
            boundarySpecs.leftOffset -
            CarObject.dimensions.with

        if (isOutLeftSideTrack || isOutRightSideTrack) {
          alert('Вы вылетели с трассы!')

          this.stop()

          return
        }
      }

      if (object instanceof TrackObject) {
        this.boundaryTrackTopOffset += this.speed

        object.clear()
        object.drawTrack()
        object.drawBoundary(this.boundaryTrackTopOffset)
      }
    })

    this.sessionId = requestAnimationFrame(this.animation.bind(this))
  }
}
