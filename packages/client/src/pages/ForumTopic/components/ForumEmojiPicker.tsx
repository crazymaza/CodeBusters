import { IconButton } from '@mui/material'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'
import { addNewReaction } from '@/store/slices/forumSlice/thunks'
import { useAppDispatch } from '@/store/typedHooks'

const cx = classNames.bind(styles)

type ForumEmojiPickerProps = {
  commentId: number
}

const enum Emojis {
  SMILE = '😀',
  THUMBUP = '👍',
  THUMBDOWN = '👎',
  HEART = '❤️',
}

const emojis_arr: Emojis[] = [
  Emojis.SMILE,
  Emojis.THUMBUP,
  Emojis.THUMBDOWN,
  Emojis.HEART,
]

const ForumEmojiPicker = (props: ForumEmojiPickerProps) => {
  const dispatch = useAppDispatch()
  const handleClickEmoji = (emoji: string, commentId: number) => {
    dispatch(
      addNewReaction({
        comment_id: commentId,
        reaction: emoji,
      })
    )
  }
  return (
    <div className={cx('emoji-picker')}>
      {emojis_arr.map((emoji, index) => (
        <IconButton
          key={index}
          color="primary"
          onClick={() => handleClickEmoji(emoji, props.commentId)}>
          {emoji}
        </IconButton>
      ))}
    </div>
  )
}

export default ForumEmojiPicker
