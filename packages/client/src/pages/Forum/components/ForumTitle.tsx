import { Fab, Tooltip, Typography } from '@mui/material'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)
type ForumTitleProps = {
  handleOpenDialog: () => void
}

const ForumTitle = (props: ForumTitleProps) => {
  return (
    <div className={cx('forumpage-title')}>
      <Typography variant="h2">Форум игроков</Typography>
      <Tooltip
        title={<h1 style={{ color: 'lightblue' }}>Новый топик</h1>}
        placement="right-start">
        <Fab
          color="primary"
          aria-label="add"
          className={cx('button__icon')}
          onClick={props.handleOpenDialog}>
          +
        </Fab>
      </Tooltip>
    </div>
  )
}

export default ForumTitle
