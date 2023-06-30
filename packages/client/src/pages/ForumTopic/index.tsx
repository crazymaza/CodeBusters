import { Button } from '@/components'
import { MainLayout } from '@/layouts'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import Avatar1 from 'images/avatar1.png'
import Avatar2 from 'images/avatar2.png'
import Avatar3 from 'images/avatar3.png'
import InputEmoji from 'react-input-emoji'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const comments: {
  avatar: string
  user_name: string
  text: string
  date: string
}[] = [
  {
    avatar: Avatar1,
    user_name: 'Alex',
    text:
      'Развитие технологий и инвестиции продолжаются, ' +
      'импортозамещение приводит к дополнительным расходам. Важно' +
      'подчеркнуть, как меняется спрос на инженеров. Если в пандемию' +
      'ценились те, кто пишет клиентские приложения, то теперь сформирован' +
      'спрос на более глубокие компетенции — системное программирование, ' +
      ' программирование программно-аппаратных вещей и т. д.',
    date: new Date().toDateString(),
  },
  {
    avatar: Avatar2,
    user_name: 'Denis',
    text:
      'Развитие технологий и инвестиции продолжаются, ' +
      'импортозамещение приводит к дополнительным расходам. Важно' +
      'подчеркнуть, как меняется спрос на инженеров. Если в пандемию' +
      'ценились те, кто пишет клиентские приложения, то теперь сформирован' +
      'спрос на более глубокие компетенции — системное программирование, ' +
      ' программирование программно-аппаратных вещей и т. д.',
    date: new Date().toDateString(),
  },
  {
    avatar: Avatar3,
    user_name: 'Геймер007',
    text:
      'Развитие технологий и инвестиции продолжаются, ' +
      'импортозамещение приводит к дополнительным расходам. Важно' +
      'подчеркнуть, как меняется спрос на инженеров. Если в пандемию ' +
      'ценились те, кто пишет клиентские приложения, то теперь сформирован ' +
      'спрос на более глубокие компетенции — системное программирование, ' +
      ' программирование программно-аппаратных вещей и т. д.',
    date: new Date().toDateString(),
  },
  {
    avatar: Avatar3,
    user_name: 'Гонщик',
    text:
      'Развитие технологий и инвестиции продолжаются, ' +
      'импортозамещение приводит к дополнительным расходам. Важно' +
      'подчеркнуть, как меняется спрос на инженеров. Если в пандемию ' +
      'ценились те, кто пишет клиентские приложения, то теперь сформирован ' +
      'спрос на более глубокие компетенции — системное программирование, ' +
      ' программирование программно-аппаратных вещей и т. д.',
    date: new Date().toDateString(),
  },
]

const renderCommentsBlock = () => (
  <Box className={cx('comments-container')}>
    <List component={Paper} className={cx('comments__list')}>
      {comments.map(({ avatar, text, date, user_name }, index) => [
        <div key={index}>
          <ListItem className={cx('comments_item')}>
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
              {date}
            </ListItemText>
          </ListItem>
          <Divider variant="fullWidth" />
        </div>,
      ])}
    </List>
  </Box>
)

const renderStub = () => (
  <Typography variant="h3">Ещё никто не оставил свой комментарий</Typography>
)

const renderCloseButton = () => (
  <div className={cx('page-content-close')}>
    <IconButton>
      <HighlightOffIcon />
    </IconButton>
  </div>
)
InputEmoji

const ForumTopicPage = () => {
  return (
    <MainLayout>
      <div className={cx('topicpage')}>
        <Paper variant="outlined" className={cx('topicpage-container')} square>
          {renderCloseButton()}
          <Typography variant="h2">Технологии</Typography>
          <form className={cx('topicpage__form')}>
            <InputEmoji placeholder="Ваш комментарий"></InputEmoji>
            <Button type="submit" variant="contained">
              Оставить комментарий
            </Button>
          </form>
          {comments.length === 0 ? renderStub() : renderCommentsBlock()}
        </Paper>
      </div>
    </MainLayout>
  )
}

export default ForumTopicPage
