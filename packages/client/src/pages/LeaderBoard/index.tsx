import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'

const cx = classNames.bind(styles)

const LeaderBoardPage = () => {
  return (
    <MainLayout>
      <div className={cx('leaderboard__page')}>
        <Paper
          variant="outlined"
          className={cx('leaderboard__page-box')}
          square>
          <Typography variant="h3">Таблица игроков</Typography>
          <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Рейтинг
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    Никнейм
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    Набранные очки
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </MainLayout>
  )
}

export default LeaderBoardPage
