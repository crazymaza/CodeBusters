import { canvas } from '@/utils'
import BaseGameObject, {
  BaseGameObjectEvent,
  BaseGameObjectSpecs,
} from '@/engine/Objects/Base/BaseGameObject'
import { TrackBoundarySide, TrackLineSide } from './types'

/*
 * @INFO Объект трассы
 *
 * Включает в себя описание отрисовки самой трассы и ее границ
 * для имитации скорости машины
 *
 */

export type TrackObjectSpecs = {
  boundaryCount?: number
  linesCount?: number
} & BaseGameObjectSpecs

export default class TrackObject extends BaseGameObject<
  TrackObjectSpecs,
  BaseGameObjectEvent
> {
  constructor(canvasApi: ReturnType<typeof canvas>) {
    super(canvasApi)
  }

  private createBoundary(side: TrackBoundarySide) {
    return Array.from({
      length: (this.specs?.boundaryCount || 0) + this.trackObjectsTopOffset,
    }).map(() => {
      const boundarySpecs = TrackObject.boundarySpecs

      const offset =
        side === TrackBoundarySide.LEFT
          ? boundarySpecs.leftOffset
          : boundarySpecs.leftOffset -
            (TrackObject.boundarySpecs.width + boundarySpecs.leftOffset * 2) +
            (this.specs?.width || 0)

      return {
        offset,
        topOffset: this.trackObjectsTopOffset,
        width: boundarySpecs.width,
        height: boundarySpecs.height,
      }
    })
  }

  private createLine(side: TrackLineSide) {
    return Array.from({
      length: (this.specs?.linesCount || 0) + this.trackObjectsTopOffset,
    }).map(() => {
      const linesSpecs = TrackObject.linesSpecs

      let offset = 0

      if (side === TrackLineSide.LEFT) {
        offset = linesSpecs.leftOffset
      }

      if (side === TrackLineSide.RIGHT) {
        offset =
          linesSpecs.leftOffset -
          (TrackObject.linesSpecs.width + linesSpecs.leftOffset * 2) +
          (this.specs?.width || 0)
      }

      return {
        offset,
        topOffset: this.trackObjectsTopOffset,
        width: linesSpecs.width,
        heigth: linesSpecs.heigth,
      }
    })
  }
}
