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
  TextField,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import Picker from 'emoji-picker-react'
import Avatar1 from 'images/avatar1.png'
import Avatar2 from 'images/avatar2.png'
import Avatar3 from 'images/avatar3.png'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

const cx = classNames.bind(styles)

const comments: {
  avatar: string
  user_name: string
  text: string
  date: Date
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
    date: new Date(),
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
    date: new Date(),
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
    date: new Date(),
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
    date: new Date(),
  },
]

const renderCommentsBlock = () => (
  <Box className={cx('comments-container')}>
    <List component={Paper} className={cx('comments__list')}>
      {comments.map(({ avatar, text, date, user_name }, index) => [
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

const renderStub = () => (
  <Typography variant="h3">Ещё никто не оставил свой комментарий</Typography>
)

const renderCloseButton = () => {
  const navigate = useNavigate()
  const closeClick = () => {
    navigate('/')
  }

  return (
    <div className={cx('page-content-close')}>
      <IconButton onClick={closeClick}>
        <HighlightOffIcon />
      </IconButton>
    </div>
  )
}

const ForumTopicPage = () => {
  const ref = useRef(null)
  const [isPickerVisible, setPickerVisible] = useState(false)
  const [inputStr, setInputStr] = useState('')

  const handleEmojiClick = (emojiObject: any, event: MouseEvent) => {
    const cursor = ref.current.selectionStart
    const text = inputStr.slice(0, cursor) + emojiObject.emoji
    setInputStr(text)
  }

  return (
    <MainLayout>
      <div className={cx('topicpage')}>
        <Paper variant="outlined" className={cx('topicpage-container')} square>
          {renderCloseButton()}
          <Typography variant="h3">Технологии</Typography>
          <form
            className={cx('topicpage__form')}
            onSubmit={e => {
              e.preventDefault()
            }}>
            <TextField
              className={cx('topicpage__form-textfield')}
              ref={ref}
              multiline={true}
              minRows={3}
              maxRows={3}
              placeholder="Введите ваш комментарий"
              value={inputStr}
              onChange={e => setInputStr(e.target.value)}
            />
            <div className={cx('buttons-container')}>
              <Button onClick={() => setPickerVisible(!isPickerVisible)}>
                <SentimentSatisfiedAltIcon />
              </Button>
              <Button type="submit" variant="contained">
                Оставить комментарий
              </Button>
            </div>
            <Link className={cx('link-back')} to="/forum">
              &lt;К списку форумов
            </Link>
          </form>
          <div className={cx('emoji-picker')}>
            <div className={cx('emoji-picker-container')}>
              {isPickerVisible ? (
                <Picker onEmojiClick={handleEmojiClick}></Picker>
              ) : null}
            </div>
          </div>
          {comments.length === 0 ? renderStub() : renderCommentsBlock()}
        </Paper>
      </div>
    </MainLayout>
  )
}

export default ForumTopicPage
