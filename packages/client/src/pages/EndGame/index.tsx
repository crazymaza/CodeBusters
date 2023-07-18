import { MainStage } from '@/components'
import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import EndGameContent from './components/EndGameContent'
import { useAppDispatch } from '@/store/typedHooks'
import { logout } from '@/store/slices/userSlice/thunks'
import { selectGameScores } from '@/store/slices/gameSlice/selectrors'
import { useAppSelector } from '@/store/typedHooks'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const EndGamePage = () => {
  const scores = useAppSelector(selectGameScores)
  const navigate = useNavigate()

  const routeToMainMenuHandler = () => {
    navigate('/')
  }

  const routeToPlayHandler = () => {
    navigate('/play')
  }

  const routeToLeaderBoardHandler = () => {
    navigate('/leader-board')
  }

  return (
    <MainLayout>
      <div className={cx('endgame')}>
        <div>
          <MainStage>
            <EndGameContent />
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default EndGamePage
