import { deleteTopic } from '@/store/slices/forumSlice/thunks'
import { useAppDispatch } from '@/store/typedHooks'
import DeleteIcon from '@mui/icons-material/Delete'
import { Badge, ListItem, ListItemText, Stack } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import classNames from 'classnames/bind'
import Forum from 'icons/forum_light_theme.png'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type ForumBlockTopicsListProps = {
  data: {
    id: number
    title: string
    description: string
    commentCount: number
  }[]
}

const ForumBlockTopicsList = (props: ForumBlockTopicsListProps) => {
  const dispatch = useAppDispatch()
  const handleDelete = (id: number) => {
    return (event: any) => {
      event.preventDefault()
      dispatch(deleteTopic(id))
    }
  }

  return (
    <div className={cx('blocktopics__wrapper')}>
      <Stack direction={'column'} spacing={1} className={cx('topics__list')}>
        {props.data.map(({ id, title, description, commentCount }) => (
          <ListItem key={id} className={cx('topics__list-item')}>
            <Badge
              badgeContent={commentCount}
              color="primary"
              max={999}
              className={cx('link__badge')}>
              <img src={Forum} alt="количество сообщений" />
            </Badge>
            <Link to={`/forum/${id}`}>
              <ListItemText
                primary={title}
                secondary={description}
                className={cx('item-text')}
              />
              <IconButton onClick={handleDelete(id)}>
                <DeleteIcon fontSize="large"></DeleteIcon>
              </IconButton>
            </Link>
          </ListItem>
        ))}
      </Stack>
    </div>
  )
}

export default ForumBlockTopicsList
