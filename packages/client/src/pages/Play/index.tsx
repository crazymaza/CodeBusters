import { useRef, useState, useMemo, useEffect } from 'react'
import { EngineStartMethodOptions } from '@/engine/Core/types'
import { CarObject, TrackObject } from '@/engine/Objects'
import { MainLayout } from '@/layouts'
import { selectGameScores } from '@/store/slices/gameSlice/selectrors'
import { setLeaderboardData } from '@/store/slices/leaderboardSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { useNavigate } from 'react-router-dom'
import { GameControls, PlayerScores } from './components'
import { useEngine, useMakeFullscreen, useCountry } from './hooks'
import { CircularProgress } from '@mui/material'

import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const PlayPage = () => {
  const [level, setLevel] = useState(1)
  const [isLoading, setLoading] = useState(true)

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

  const trackSpecs = engine?.getGameObject<TrackObject>('track').getSpecs()

  const carSpecs = engine?.getGameObject<CarObject>('car').getSpecs()

  useMakeFullscreen()

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
      nickname: user?.display_name,
      avatar: user?.avatar,
      codebustersScores: scores,
      userId: user?.id ?? 0,
      userCountry: country.userCountry ?? '-',
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
            className={cx('play__background')}
            width={1000}
            height={800}
          />
          <canvas ref={trackRef} className={cx('play__track')} />
          <canvas
            ref={carRef}
            className={cx('play__car')}
            width={trackSpecs?.width || 0}
            height={carSpecs?.height || 0}
            style={{ bottom: 30 }}
          />
          <canvas
            ref={barrierRef}
            className={cx('play__barrier')}
            width={trackSpecs?.width || 0}
            height={trackSpecs?.height || 710}
          />
          <canvas
            ref={endGameMessageRef}
            className={cx('play__endgame')}
            width={trackSpecs?.width || 0}
            height={trackRef?.current?.height || 710}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default PlayPage
