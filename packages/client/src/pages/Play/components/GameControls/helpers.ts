import { CodeBustersEngineProcess } from '@/engine/Core/types'

export const getStartButtonName = (gameProcess: CodeBustersEngineProcess) => {
  switch (gameProcess) {
    case CodeBustersEngineProcess.PLAY:
      return 'Пауза'

    case CodeBustersEngineProcess.PAUSE:
      return 'Продолжить'

    default:
      return 'Начать игру'
  }
}
