import { Button } from '@/components'
import { MainLayout } from '@/layouts'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import Avatar1 from 'images/avatar1.png'
import Avatar2 from 'images/avatar2.png'
import Avatar3 from 'images/avatar3.png'
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

const ForumTopicPage = () => {
  return (
    <MainLayout>
      <div className={cx('topic__page')}>
        <Paper
          variant="outlined"
          className={cx('topic__page_container')}
          square>
          <Typography variant="h2">Название темы</Typography>
          <form className={cx('topic__page_form')}>
            <TextField
              variant="filled"
              multiline={true}
              minRows={4}
              maxRows={4}
              placeholder="Ваш комментарий"
            />
            <Button type="submit" variant="contained">
              Оставить комментарий
            </Button>
          </form>
          <Box className={cx('comments_container')}>
            <List component={Paper} className={cx('comments_list')}>
              {comments.map(({ avatar, text, date, user_name }, index) => [
                <ListItem key={index} className={cx('comments_item')}>
                  <ListItemIcon>
                    <Avatar
                      src={avatar}
                      className={cx('comments_item__icon')}></Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    secondary={user_name}
                    className={cx('comments_item_text')}
                  />
                  <ListItemText className={cx('comments_item_date')}>
                    {date}
                  </ListItemText>
                </ListItem>,
                <Divider variant="fullWidth" />,
              ])}
            </List>
          </Box>
        </Paper>
      </div>
    </MainLayout>
  )
}

export default ForumTopicPage
