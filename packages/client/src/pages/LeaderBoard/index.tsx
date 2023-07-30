import { MainStage } from '@/components'
import CloseButton from '@/components/CloseButton'
import { MainLayout } from '@/layouts'
import { TableContainer, Typography } from '@mui/material'
import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import CustomizedTable from './parts/customizedTable'
import { getLeaderboardData } from '@/store/slices/leaderboardSlice/thunks'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store/typedHooks'

const cx = classNames.bind(styles)

const LeaderBoardPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClosePage = () => {
    navigate('/')
  }

  useEffect(() => {
    dispatch(getLeaderboardData())
  }, [])

  return (
    <MainLayout>
      <div className={cx('leaderboard__page')}>
        <div className={cx('leaderboard__page-wrapper')}>
          <MainStage>
            <div className={cx('leaderboard__page-container')}>
              <div className={cx('leaderboard__page-title')}>
                <Typography variant="h3">Турнирная таблица</Typography>
                <div className={cx('page-content-close')}>
                  <CloseButton onClick={handleClosePage} />
                </div>
              </div>
              <div className={cx('table-container')}>
                <TableContainer className={cx('table__block-container')}>
                  <CustomizedTable />
                </TableContainer>
              </div>
            </div>
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default LeaderBoardPage
