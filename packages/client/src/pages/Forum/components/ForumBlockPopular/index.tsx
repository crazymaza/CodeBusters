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
  data: string[]
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
          {props.data.map((topic, index) => (
            <ListItem key={index}>
              <ListItemIcon className={cx('popular__list-icon')}>
                <img src={icons.Zvezda}></img>
              </ListItemIcon>
              <Link to={`/forum/${index}`} className={cx('popular__list-link')}>
                <ListItemText
                  primary={topic}
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
