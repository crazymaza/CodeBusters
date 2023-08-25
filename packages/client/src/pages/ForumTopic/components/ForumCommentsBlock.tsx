import { Button } from '@/components'
import Avatar from '@/components/Avatar'
import { CommentData } from '@/store/slices/forumSlice'
import { addNewReaction } from '@/store/slices/forumSlice/thunks'
import { useAppDispatch } from '@/store/typedHooks'
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
import ForumReactionBlock from './ForumReactionBlock'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type ForumCommentsBlockProps = {
  data: CommentData[]
}

const renderStub = () => (
  <Typography variant="h3">Ещё никто не оставил свой комментарий</Typography>
)

const handleEmojiClick = (emojiObject: any, event: MouseEvent) => {
  console.log(event.target)
  // const cursor = (ref?.current && ref.current.selectionStart) ?? 0
  // const text = inputStr.slice(0, cursor) + emojiObject.emoji

  // const text = emojiObject.emoji
  // setInputStr();
}

const ForumCommentsBlock = (props: ForumCommentsBlockProps) => {
  const [isPickerVisible, setPickerVisible] = useState(false)
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(
      addNewReaction({
        commentId: 26,
        userId: 1312220,
        reaction: '👍',
      })
    )
  }

  return (
    <Box className={cx('comments-container')}>
      <List component={Paper} className={cx('comments__list')}>
        {props.data.length === 0
          ? renderStub()
          : props.data.map(({ user, text, createdAt, reactions }, index) => [
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
                  </ListItemText>
                  <ListItemText>
                    <Button onClick={() => handleClick()}>
                      <SentimentSatisfiedAltIcon />
                    </Button>
                  </ListItemText>
                </ListItem>
                <ForumReactionBlock reactions={reactions} />
                <Divider variant="fullWidth" />
              </div>,
            ])}
      </List>
    </Box>
  )
}

export default ForumCommentsBlock
