import { MainLayout } from '@/layouts'
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import Forum from 'icons/forum_light_theme.png'
import Zvezda from 'icons/zvezda.png'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const topicsList: {
  title: string
  description: string
  count_messages: number
}[] = [
  {
    title: 'Новые игры',
    description: 'Обсуждаем новые игры',
    count_messages: 10,
  },
  {
    title: 'Геймдизайнеры',
    description: 'Всё о работе геймдизайнера',
    count_messages: 1000,
  },
  {
    title: 'Технологии',
    description: 'Новости из мира технологий',
    count_messages: 1,
  },
  {
    title: 'Игровые механики',
    description: 'Делимся опытом разработки игровых механик',
    count_messages: 10,
  },
  {
    title: 'Технологии',
    description: 'Новости из мира технологий',
    count_messages: 2324,
  },
  {
    title: 'Игровые механики',
    description: 'Делимся опытом разработки игровых механик',
    count_messages: 1333,
  },
  {
    title: 'Технологии',
    description: 'Новости из мира технологий',
    count_messages: 109,
  },
  {
    title: 'Игровые механики',
    description: 'Делимся опытом разработки игровых механик',
    count_messages: 10,
  },
]

const topicsPopular = [
  'Лучшие текстуры для игр',
  'Игры как искусство',
  'Культовые саундтреки для игр',
  'Технологии',
  'Игровые механики',
]

const ForumPage: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const renderDialog = () => (
    <Dialog open={open}>
      <DialogTitle variant="h3">Создание новой темы</DialogTitle>
      <form className={cx('dialog__form-container')}>
        <DialogContent>
          <TextField
            margin="dense"
            id="topic_name"
            label="Название темы"
            fullWidth
            variant="standard"
            className={cx('dialog__form-textfield')}
          />
          <TextField
            margin="dense"
            id="topic_description"
            label="Описание темы"
            fullWidth
            variant="standard"
            className={cx('dialog__form-textfield')}
          />
          <Button
            type={'submit'}
            variant="contained"
            className={cx('dialog__form-button')}
            onClick={handleClose}>
            Создать
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainLayout>
      <div className={cx('forumpage')}>
        <Paper variant="outlined" className={cx('forumpage-container')} square>
          <div className={cx('block-topics')}>
            <div className={cx('forumpage_title')}>
              <Typography variant="h2">Форум игроков</Typography>
              <Tooltip
                title={<h1 style={{ color: 'lightblue' }}>Новый топик</h1>}
                placement="right-start">
                <Fab
                  color="primary"
                  aria-label="add"
                  className={cx('button__icon')}
                  onClick={() => handleOpen()}>
                  +
                </Fab>
              </Tooltip>
            </div>
            <div className={cx('block-topics-wrapper')}>
              <Stack
                direction={'column'}
                spacing={1}
                className={cx('topics__list')}>
                {topicsList.map(
                  ({ title, description, count_messages }, index) => (
                    <ListItem key={index} className={cx('topics__list-item')}>
                      <Link to={`/forum/${index}`}>
                        <ListItemText primary={title} secondary={description} />
                        <Badge
                          badgeContent={count_messages}
                          color="primary"
                          max={999}
                          className={cx('link__badge')}>
                          <img src={Forum} alt="количество сообщений" />
                        </Badge>
                      </Link>
                    </ListItem>
                  )
                )}
              </Stack>
            </div>
          </div>
          <hr />
          <div className={cx('block-topics-popular')}>
            <Paper
              variant="outlined"
              className={cx('block-topics-popular-wrapper')}
              square>
              <Typography variant="h3">Топ-5 тем</Typography>
              <List>
                {topicsPopular.map((topic, index) => (
                  <ListItem key={index}>
                    <ListItemIcon className={cx('popular__list-icon')}>
                      <img src={Zvezda}></img>
                    </ListItemIcon>
                    <Link
                      to={`/forum/${index}`}
                      className={cx('popular__list-link')}>
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
        </Paper>
      </div>
      {renderDialog()}
    </MainLayout>
  )
}

export default ForumPage
