import { Button } from '@/components'
import Avatar from '@/components/Avatar'
import { CommentData } from '@/store/slices/forumSlice'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
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
import classNames from 'classnames/bind'
import { useState } from 'react'
import ForumEmojiPicker from './ForumEmojiPicker'
import ForumReactionBlock from './ForumReactionBlock'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type ForumCommentsBlockProps = {
  data: CommentData[]
}

const renderStub = () => (
  <Typography variant="h3">Ещё никто не оставил свой комментарий</Typography>
)

const ForumCommentsBlock = (props: ForumCommentsBlockProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false)
  const [currentComment, setCurrentComment] = useState(0)

  const handleClick = (e: any, id: number) => {
    setPickerVisible(!isPickerVisible)
    setCurrentComment(id)
  }

  const renderEmojiPicker = () => (
    <ForumEmojiPicker commentId={currentComment} />
  )

  return (
    <Box className={cx('comments-container')}>
      {isPickerVisible ? renderEmojiPicker() : null}
      <List component={Paper} className={cx('comments__list')}>
        {props.data.length === 0
          ? renderStub()
          : props.data.map(
              ({ id, user, text, createdAt, reactions }, index) => [
                <div key={index}>
                  <ListItem className={cx('comments-item')}>
                    <ListItemIcon>
                      <Avatar
                        src={user?.avatar || ''}
                        className={cx('comments-item-icon')}></Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      secondary={user?.firstName}
                      className={cx('comments-item-text')}
                    />
                    <ListItemText className={cx('comments-item-date')}>
                      {createdAt}
                      <Button onClick={e => handleClick(e, id)}>
                        <SentimentSatisfiedAltIcon />
                      </Button>
                    </ListItemText>
                  </ListItem>
                  {reactions.length !== 0 ? (
                    <ForumReactionBlock reactions={reactions} />
                  ) : null}
                  <Divider variant="fullWidth" />
                </div>,
              ]
            )}
      </List>
    </Box>
  )
}

export default ForumCommentsBlock
