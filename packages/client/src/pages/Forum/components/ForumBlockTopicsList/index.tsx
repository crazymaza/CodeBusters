import { Badge, ListItem, ListItemText, Stack } from '@mui/material'
import classNames from 'classnames/bind'
import Forum from 'icons/forum_light_theme.png'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type TopicsListData = {
  title: string
  description: string
  count_messages: number
}

type ForumBlockTopicsListProps = {
  data: TopicsListData[]
}

const ForumBlockTopicsList = (props: ForumBlockTopicsListProps) => {
  return (
    <div className={cx('blocktopics__wrapper')}>
      <Stack direction={'column'} spacing={1} className={cx('topics__list')}>
        {props.data.map(({ title, description, count_messages }, index) => (
          <ListItem key={index} className={cx('topics__list-item')}>
            <Link to={`/forum/${index}`}>
              <ListItemText
                primary={title}
                secondary={description}
                className={cx('item-text')}
              />
              <Badge
                badgeContent={count_messages}
                color="primary"
                max={999}
                className={cx('link__badge')}>
                <img src={Forum} alt="количество сообщений" />
              </Badge>
            </Link>
          </ListItem>
        ))}
      </Stack>
    </div>
  )
}

export default ForumBlockTopicsList
