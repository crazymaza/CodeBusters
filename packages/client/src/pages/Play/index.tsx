import { useRef, useState, useEffect } from 'react'
import { EngineStartMethodOptions } from '@/engine/Core/types'
import { CarObject, TrackObject } from '@/engine/Objects'
import { MainLayout } from '@/layouts'
import { selectGameScores } from '@/store/slices/gameSlice/selectors'
import { setLeaderboardData } from '@/store/slices/leaderboardSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { GameControls, PlayerScores, RaceTimeLeft } from './components'
import { useEngine, useMakeFullscreen, useCountry } from './hooks'
import { CircularProgress } from '@mui/material'

import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const PlayPage = () => {
  useMakeFullscreen()

  const [level, setLevel] = useState(1)
  const [isLoading, setLoading] = useState(true)

  const navigate = useNavigate()

  const user = useAppSelector(selectUserInfo)
  const scores = useAppSelector(selectGameScores)
  const dispatch = useAppDispatch()

  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLCanvasElement>(null)
  const trackRef = useRef<HTMLCanvasElement>(null)
  const linesRef = useRef<HTMLCanvasElement>(null)
  const bordersRef = useRef<HTMLCanvasElement>(null)
  const carRef = useRef<HTMLCanvasElement>(null)
  const enemyRef = useRef<HTMLCanvasElement>(null)
  const fuelRef = useRef<HTMLCanvasElement>(null)
  const messageRef = useRef<HTMLCanvasElement>(null)

  const engine = useEngine({
    backgroundRef,
    containerRef,
    trackRef,
    linesRef,
    bordersRef,
    enemyRef,
    carRef,
    fuelRef,
    messageRef,
  })

  const trackSpecs = engine?.getGameObject<TrackObject>('track').getSpecs()

  const carSpecs = engine?.getGameObject<CarObject>('car').getSpecs()

  const country = useCountry()

  const startGame = (options?: EngineStartMethodOptions) => {
    setLevel(1)

    engine?.start(options)
  }

  const pauseGame = () => {
    engine?.pause()
  }

  const endGame = () => {
    const data = {
      nickname:
        user?.display_name || `${user?.first_name} ${user?.second_name}`,
      avatar: user?.avatar,
      codebustersScores: scores,
      userId: user?.id ?? 0,
      userCountry: country.userCountry ?? '-',
    }
    dispatch(setLeaderboardData(data))

    engine?.end()
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

  useEffect(() => {
    if (trackSpecs && carSpecs) {
      setLoading(false)
    }
  }, [trackSpecs, carSpecs])

  return (
    <MainLayout>
      <div className={cx('play__page')}>
        <div className={cx('play__level')}>
          <span className={cx('level__number')}>{level}</span>
          <span>уровень</span>
          <PlayerScores />
          <RaceTimeLeft />
        </div>
        <div className={cx('play__buttons')}>
          <GameControls
            controls={{ startGame, pauseGame, endGame, leaderboard, exitGame }}
          />
        </div>
        {isLoading && (
          <div className={cx(['play__loader'])}>
            <CircularProgress />
          </div>
        )}
        <div
          ref={containerRef}
          className={cx('play__area', { ['play__area_hidden']: isLoading })}>
          <canvas
            ref={backgroundRef}
            width={containerRef.current?.offsetWidth}
            height={containerRef.current?.offsetHeight}
            className={cx('play__background')}
          />
          <canvas ref={trackRef} className={cx('play__track')} />
          <canvas
            ref={linesRef}
            width={trackSpecs?.width}
            height={trackSpecs?.height}
            className={cx('play__lines')}
          />
          <canvas
            ref={bordersRef}
            width={trackSpecs?.width}
            height={trackSpecs?.height}
            className={cx('play__borders')}
          />
          <canvas
            ref={fuelRef}
            className={cx('play__fuel')}
            width={trackSpecs?.width}
            height={trackSpecs?.height}
          />
          <canvas
            ref={carRef}
            className={cx('play__car')}
            width={trackSpecs?.width}
            height={carSpecs?.layerHeight}
            style={{ bottom: carSpecs?.bottomOffset }}
          />
          <canvas
            ref={enemyRef}
            className={cx('play__enemy')}
            width={trackSpecs?.width}
            height={trackSpecs?.height}
          />
          <canvas
            ref={messageRef}
            className={cx('play__message')}
            width={trackSpecs?.width}
            height={trackRef?.current?.height}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default PlayPage
