import { ReactionData } from '@/store/slices/forumSlice'
import styles from './styles.module.scss'
import classNames from 'classnames/bind'
import { IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { deleteReaction } from '@/store/slices/forumSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'

const cx = classNames.bind(styles)

type ForumReactionBlockProps = {
  reactions: ReactionData[]
}

const ForumReactionBlock = (props: ForumReactionBlockProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUserInfo)

  const handleEmojiClick = (reaction: string) => {
    return () => {
      const currentReaction = props.reactions.filter(
        r => r.reaction === reaction
      )[0]
      const reactionId = currentReaction.reactionIdByUser.get(user?.id || 0)
      if (reactionId) {
        dispatch(deleteReaction(reactionId))
      }
    }
  }
  return (
    <div className={cx('forum-reactions')}>
      {props.reactions.map((reaction, id) => (
        <IconButton
          key={id}
          color="primary"
          onClick={handleEmojiClick(reaction.reaction)}>
          {reaction.reaction}
          {reaction.count}
        </IconButton>
      ))}
    </div>
  )
}

export default ForumReactionBlock
