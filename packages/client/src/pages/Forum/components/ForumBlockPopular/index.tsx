import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import * as icons from '../icons'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type ForumBlockPopularProps = {
  data: { id: number; title: string }[]
}

const ForumBlockPopular = (props: ForumBlockPopularProps) => {
  return (
    <div className={cx('topfive-block-popular')}>
      <Paper
        variant="outlined"
        className={cx('topfive-block-popular__wrapper')}
        square>
        <Typography variant="h3">Топ-5 тем</Typography>
        <List>
          {props.data.map(({ title, id }) => (
            <ListItem key={id}>
              <ListItemIcon className={cx('popular__list-icon')}>
                <img src={icons.Zvezda}></img>
              </ListItemIcon>
              <Link to={`/forum/${id}`} className={cx('popular__list-link')}>
                <ListItemText
                  primary={title}
                  className={cx('popular__list-text')}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}

export default ForumBlockPopular
