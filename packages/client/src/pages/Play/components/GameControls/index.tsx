import { useState, useMemo, MouseEventHandler } from 'react'
import { selectGameProcess } from '@/store/slices/gameSlice/selectors'
import { useAppSelector } from '@/store/typedHooks'
import { EngineProcess, EngineStartMethodOptions } from '@/engine/Core/types'
import { Button } from '@mui/material'
import { getStartButtonName } from './helpers'

type ControlHandler = (options?: EngineStartMethodOptions) => void

type ControlHandlerName =
  | 'startGame'
  | 'pauseGame'
  | 'endGame'
  | 'exitGame'
  | 'leaderboard'

export type GameControlsProps = {
  controls: {
    [key in ControlHandlerName]: ControlHandler
  }
}

const GameControls: React.FC<GameControlsProps> = ({ controls }) => {
  const gameProcess = useAppSelector(selectGameProcess)

  const [prevGameProcess, setPrevGameProcess] = useState(gameProcess)

  const startButtonName = getStartButtonName(gameProcess)

  const onStart = () => {
    const isResume = prevGameProcess === EngineProcess.PLAY

    gameProcess == EngineProcess.PLAY
      ? controls.pauseGame()
      : controls.startGame({ isResume })

    setPrevGameProcess(gameProcess)
  }

  const renderEndGameButton = useMemo(() => {
    const isGameProcess =
      gameProcess === EngineProcess.PLAY || gameProcess === EngineProcess.PAUSE

    const onEnd = () => {
      controls.endGame()
      setPrevGameProcess(EngineProcess.STOP)
    }

    return isGameProcess ? (
      <Button variant="contained" onClick={onEnd}>
        Завершить игру
      </Button>
    ) : null
  }, [gameProcess])

  const renderLeaderboardButton = useMemo(() => {
    const isStop =
      gameProcess !== EngineProcess.PLAY && gameProcess !== EngineProcess.PAUSE

    return isStop ? (
      <Button
        variant="contained"
        onClick={controls.leaderboard as MouseEventHandler}>
        Рейтинг игроков
      </Button>
    ) : null
  }, [gameProcess])

  return (
    <>
      <Button variant="contained" onClick={onStart}>
        {startButtonName}
      </Button>

      {renderLeaderboardButton}

      {renderEndGameButton}

      <Button
        variant="contained"
        onClick={controls.exitGame as MouseEventHandler}>
        Выйти в меню
      </Button>
    </>
  )
}

export default GameControls
