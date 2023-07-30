import { Table, TableBody, TableRow, TableCell, Avatar } from '@mui/material'
import { useState } from 'react'
import { Order, ILeaderList } from '../../types'
import TableHeader from '../tableHeader'
import { getColorForCup } from '../../functions'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { useAppSelector } from '@/store/typedHooks'

const cx = classNames.bind(styles)

const CustomizedTable = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ILeaderList>('rating')
  const leaderList = useAppSelector(state => state.leaderboard.data)

  const handleRequestSort = (property: keyof ILeaderList) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <Table size="medium" stickyHeader>
      <TableHeader
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
      />
      <TableBody>
        {leaderList.map(
          ({ avatar, nickname, codebustersScores, userId }, index) => (
            <TableRow key={userId} className={cx('table__row')}>
              <TableCell className={cx('table__column-raiting')}>
                <div className={cx('table__column-raiting_flex')}>
                  {index + 1}
                  <img
                    src={getColorForCup(index + 1)}
                    className={cx('icon__img')}
                  />
                </div>
              </TableCell>
              <TableCell className={cx('table__column-login')}>
                <div className={cx('table__column-wrapper')}>
                  <Avatar src={avatar} />
                  <span>{nickname}</span>
                </div>
              </TableCell>
              <TableCell className={cx('table__column-scores')}>
                {codebustersScores}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}

export default CustomizedTable
