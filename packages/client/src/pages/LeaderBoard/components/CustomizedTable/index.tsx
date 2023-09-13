import { Table, TableBody, TableRow, TableCell } from '@mui/material'
import { useState } from 'react'
import { Order, ILeaderList, OrderTypes } from '@/pages/LeaderBoard/types'
import TableHeader from '../TableHeader'
import { getColorForCup } from '@/pages/LeaderBoard/functions'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { useAppSelector } from '@/store/typedHooks'
import { selectLeaderboardData } from '@/store/slices/leaderboardSlice/selectors'
import Avatar from '@/components/Avatar'

const cx = classNames.bind(styles)

const CustomizedTable = () => {
  const [order, setOrder] = useState<Order>(OrderTypes.ASC)
  const [orderBy, setOrderBy] = useState<keyof ILeaderList>('rating')
  const leaderList = useAppSelector(selectLeaderboardData)

  const handleRequestSort = (property: keyof ILeaderList) => {
    const direction =
      orderBy === property && order === OrderTypes.ASC
        ? OrderTypes.DESC
        : OrderTypes.ASC
    setOrder(direction)
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
          (
            { avatar, nickname, codebustersScores, userId, userCountry },
            index
          ) => (
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
                  <Avatar src={avatar} className={cx('leaderboard__avatar')} />
                  <span>{nickname || 'Безымянный гонщик'}</span>
                </div>
              </TableCell>
              <TableCell className={cx('table__column-scores')}>
                {codebustersScores}
              </TableCell>
              <TableCell className={cx('table__column-country')}>
                {userCountry}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  )
}

export default CustomizedTable
