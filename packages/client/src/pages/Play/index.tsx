import { useRef, useState } from 'react'
import { useEngine, useMakeFullscreen } from './hooks'
import { MainLayout } from '@/layouts'
import { CarObject, TrackObject } from '@/engine/Objects'
import { RunMethodOptions } from '@/engine/Core/types'
import { useNavigate } from 'react-router-dom'
import { PlayerScores, GameControls } from './components'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { selectGameScores } from '@/store/slices/gameSlice/selectrors'
import { setLeaderboardData } from '@/store/slices/leaderboardSlice/thunks'

const cx = classNames.bind(styles)

const PlayPage = () => {
  const [level, setLevel] = useState(1)
  const user = useAppSelector(selectUserInfo)
  const scores = useAppSelector(selectGameScores)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLCanvasElement>(null)
  const trackRef = useRef<HTMLCanvasElement>(null)
  const carRef = useRef<HTMLCanvasElement>(null)
  const barrierRef = useRef<HTMLCanvasElement>(null)
  const endGameMessageRef = useRef<HTMLCanvasElement>(null)

  const engine = useEngine({
    backgroundRef,
    containerRef,
    trackRef,
    carRef,
    barrierRef,
    endGameMessageRef,
  })

  useMakeFullscreen()

  const startGame = (options?: RunMethodOptions) => {
    setLevel(1)

    engine?.run(options)
  }

  const pauseGame = () => {
    engine?.pause()
  }

  const endGame = () => {
    const data = {
      nickname: user?.display_name,
      avatar: user?.avatar,
      codebustersScores: scores,
      userId: user?.id ?? 0,
    }
    dispatch(setLeaderboardData(data))

    engine?.destroy()
  }

  const leaderboard = () => {
    endGame()

    navigate('/leader-board')
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  const exitGame = () => {
    endGame()

    navigate('/')
    if (document.fullscreenElement) {
      document.exitFullscreen()
    }
  }

  return (
    <MainLayout>
      <div className={cx('play__page')}>
        <div className={cx('play__level')}>
          <span className={cx('level__number')}>{level}</span>
          <span>уровень</span>
          <PlayerScores />
        </div>
        <div className={cx('play__buttons')}>
          <GameControls
            controls={{ startGame, pauseGame, endGame, leaderboard, exitGame }}
          />
        </div>
        <div ref={containerRef} className={cx('play__area')}>
          <canvas
            ref={backgroundRef}
            className={cx('play__background')}
            width={1000}
            height={800}
          />
          <canvas ref={trackRef} className={cx('play__track')} />
          <canvas
            ref={carRef}
            className={cx('play__car')}
            width={TrackObject.width}
            height={CarObject.dimensions.height}
            style={{ bottom: CarObject.dimensions.bottomMargin }}
          />
          <canvas
            ref={barrierRef}
            className={cx('play__barrier')}
            width={TrackObject.width}
            height={trackRef?.current?.height || 710}
          />
          <canvas
            ref={endGameMessageRef}
            className={cx('play__endgame')}
            width={TrackObject.width}
            height={trackRef?.current?.height || 710}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default PlayPage
