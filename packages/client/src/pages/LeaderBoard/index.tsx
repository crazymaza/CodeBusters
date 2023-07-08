import CloseButton from '@/components/CloseButton'
import { MainLayout } from '@/layouts'
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import BronzeCup from 'icons/bronze_cup.png'
import GoldCup from 'icons/gold_cup.png'
import SilverCup from 'icons/silver_cup.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { headerCells, leaderList } from './data'
import styles from './styles.module.scss'
import { ILeaderList, Order } from './types'
import { MainStage } from '@/components'

const cx = classNames.bind(styles)

const getColorForCup = (rating: string) => {
  switch (rating) {
    case '1':
      return GoldCup
    case '2':
      return SilverCup
    case '3':
      return BronzeCup
    default:
      return ''
  }
}
const renderCupIcon = (rating: string) => {
  const icon = getColorForCup(rating)
  return <img src={icon} className={cx('icon__img')} />
}

interface ITableProps {
  onRequestSort: (property: keyof ILeaderList) => void
  order: Order
  orderBy: string
}

const TableHeader = (props: ITableProps) => {
  const { onRequestSort, order, orderBy } = props
  const createSortHandler = (property: keyof ILeaderList) => () => {
    onRequestSort(property)
  }

  return (
    <TableHead>
      <TableRow className={cx('table__header')}>
        {headerCells.map(headerCell => (
          <TableCell className={cx('table__header-column')} key={headerCell.id}>
            {headerCell.label}
            <TableSortLabel
              active={orderBy === headerCell.id}
              direction={orderBy === headerCell.id ? order : 'asc'}
              onClick={createSortHandler(headerCell.id)}></TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const CustomizedTable = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof ILeaderList>('rating')

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
        {leaderList.map(({ rating, avatar, nickname, scores }, index) => (
          <TableRow key={index} className={cx('table__row')}>
            <TableCell className={cx('table__column-raiting')}>
              <div className={cx('table__column-raiting_flex')}>
                {rating}
                {renderCupIcon(rating)}
              </div>
            </TableCell>
            <TableCell className={cx('table__column-login')}>
              <div className={cx('table__column-wrapper')}>
                <Avatar src={avatar} />
                <span>{nickname}</span>
              </div>
            </TableCell>
            <TableCell className={cx('table__column-scores')}>
              {scores}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const LeaderBoardPage = () => {
  const navigate = useNavigate()

  const handleClosePage = () => {
    navigate('/')
  }

  return (
    <MainLayout>
      <div className={cx('leaderboard__page')}>
        {/* <Paper
          variant="outlined"
          className={cx('leaderboard__page-container')}
          square> */}
        <div className={cx('leaderboard__page-wrapper')}>
          <MainStage>
            {/* <div className={cx('leaderboard__page-content')}> */}
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
            {/* </div> */}
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default LeaderBoardPage
