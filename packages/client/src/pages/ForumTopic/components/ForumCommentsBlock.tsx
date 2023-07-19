import Avatar from '@/components/Avatar'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

type CommentsData = {
  avatar: string
  user_name: string
  text: string
  date: Date
}

type ForumCommentsBlockProps = {
  data: CommentsData[]
}

const renderStub = () => (
  <Typography variant="h3">Ещё никто не оставил свой комментарий</Typography>
)

const ForumCommentsBlock = (props: ForumCommentsBlockProps) => {
  return (
    <Box className={cx('comments-container')}>
      <List component={Paper} className={cx('comments__list')}>
        {props.data.length === 0
          ? renderStub()
          : props.data.map(({ avatar, text, date, user_name }, index) => [
              <div key={index}>
                <ListItem className={cx('comments-item')}>
                  <ListItemIcon>
                    <Avatar
                      src={avatar}
                      className={cx('comments-item-icon')}></Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    secondary={user_name}
                    className={cx('comments-item-text')}
                  />
                  <ListItemText className={cx('comments-item-date')}>
                    {date.toLocaleDateString()}
                  </ListItemText>
                </ListItem>
                <Divider variant="fullWidth" />
              </div>,
            ])}
      </List>
    </Box>
  )
}

export default ForumCommentsBlock
