import { MainStage } from '@/components'
import { MainLayout } from '@/layouts'
import { selectGameScores } from '@/store/slices/gameSlice/selectrors'
import { useAppSelector } from '@/store/typedHooks'
import classNames from 'classnames/bind'
import EndGameContent from './components/EndGameContent'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const EndGamePage = () => {
  const scores = useAppSelector(selectGameScores)

  return (
    <MainLayout>
      <div className={cx('endgame')}>
        <div>
          <MainStage>
            <EndGameContent scores={scores} />
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default EndGamePage
