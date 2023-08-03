import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material'
import { headerCells } from './data'
import { ILeaderList, ITableProps } from '@/pages/LeaderBoard/types'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const TableHeader = (props: ITableProps) => {
  const { onRequestSort, order, orderBy } = props
  const createSortHandler = (property: keyof ILeaderList) => () => {
    onRequestSort(property)
  }

  return (
    <TableHead>
      <TableRow className={cx('table__header')}>
        {headerCells.map(({ id, label }) => (
          <TableCell className={cx('table__header-column')} key={id}>
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}>
              {label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
