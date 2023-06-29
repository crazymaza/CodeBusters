import { MainLayout } from '@/layouts'
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import classNames from 'classnames/bind'
import Forum from 'icons/forum_light_theme.png'
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

const ForumPage: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <MainLayout>
      <div className={cx('forum__page')}>
        <Paper
          variant="outlined"
          className={cx('forum__page_container')}
          square>
          <div className={cx('block__topics')}>
            <div className={cx('forum__page_title')}>
              <Typography variant="h2">Форум игроков</Typography>
              <Tooltip
                title={<h1 style={{ color: 'lightblue' }}>Новый топик</h1>}
                placement="right-start">
                <Fab
                  color="primary"
                  aria-label="add"
                  className={cx('button__icon')}
                  onClick={() => handleClickOpen()}>
                  +
                </Fab>
              </Tooltip>
            </div>
            <div className={cx('block__topics_wrapper')}>
              <Stack
                direction={'column'}
                spacing={1}
                className={cx('topics_list')}>
                {topicsList.map(
                  ({ title, description, count_messages }, index) => (
                    <ListItem key={index} className={cx('topics_list__item')}>
                      <Link to={`/forum/${index}`}>
                        <ListItemText primary={title} secondary={description} />
                        <Badge
                          badgeContent={count_messages}
                          color="primary"
                          max={999}
                          className={cx('link_badge')}>
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
          <div className={cx('block__topics_popular')}>
            <Paper
              variant="outlined"
              className={cx('block__topics_popular_wrapper')}
              square>
              <Typography variant="h4">Топ-10 тем</Typography>
            </Paper>
          </div>
        </Paper>
      </div>
      <Dialog open={open}>
        <DialogTitle variant="h3">Создание нового топика</DialogTitle>
        <Grid component={'form'} className={cx('dialog-form__container')}>
          <DialogContent>
            <TextField
              margin="dense"
              id="topic_name"
              label="Название топика"
              fullWidth
              variant="standard"
              className={cx('dialog-form__textfield')}
            />
            <Button
              type={'submit'}
              variant="contained"
              className={cx('dialog-form__button')}
              onClick={handleClose}>
              Создать
            </Button>
          </DialogContent>
        </Grid>
      </Dialog>
    </MainLayout>
  )
}

export default ForumPage
