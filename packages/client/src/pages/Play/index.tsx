import { RunMethodOptions } from '@/engine/Core/types'
import { CarObject, TrackObject } from '@/engine/Objects'
import { MainLayout } from '@/layouts'
import { selectGameScores } from '@/store/slices/gameSlice/selectrors'
import { setLeaderboardData } from '@/store/slices/leaderboardSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameControls, PlayerScores } from './components'
import { useEngine, useMakeFullscreen, useCountry } from './hooks'
import styles from './styles.module.scss'


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

  const country =  useCountry()

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
      userCountry: country.user_country ?? '-',
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
