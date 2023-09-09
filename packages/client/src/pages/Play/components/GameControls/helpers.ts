import { EngineProcess } from '@/engine/Core/types'

export const getStartButtonName = (gameProcess: EngineProcess) => {
  switch (gameProcess) {
    case EngineProcess.PLAY:
      return 'Пауза'

    case EngineProcess.PAUSE:
      return 'Продолжить'

    default:
      return 'Начать игру'
  }
}
