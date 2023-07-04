import { MainLayout } from '@/layouts'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
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
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import * as data from './data'

const cx = classNames.bind(styles)

const ForumPage: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  // TODO: рефакторинг
  const renderCloseButton = () => {
    const navigate = useNavigate()
    const handleClosePage = () => {
      navigate('/')
    }
    return (
      <div className={cx('page-content-close')}>
        <IconButton onClick={handleClosePage}>
          <HighlightOffIcon />
        </IconButton>
      </div>
    )
  }

  // TODO: рефакторинг
  const renderDialog = () => (
    <Dialog open={open}>
      <DialogTitle variant="h3">Создание новой темы</DialogTitle>
      <form
        className={cx('dialog__form-container')}
        onSubmit={e => e.preventDefault()}>
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
          <div className={cx('buttons-container')}>
            <Button
              type={'submit'}
              variant="contained"
              className={cx('dialog__form-button')}
              onClick={e => {
                e.preventDefault()
              }}>
              Создать
            </Button>
            <Button
              type={'button'}
              variant="contained"
              className={cx('dialog__form-button')}
              onClick={handleCloseDialog}>
              Отмена
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )

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
                  onClick={() => handleOpenDialog()}>
                  +
                </Fab>
              </Tooltip>
            </div>
            <div className={cx('block-topics-wrapper')}>
              <Stack
                direction={'column'}
                spacing={1}
                className={cx('topics__list')}>
                {data.topicsList.map(
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
            {renderCloseButton()}
            <Paper
              variant="outlined"
              className={cx('block-topics-popular-wrapper')}
              square>
              <Typography variant="h3">Топ-5 тем</Typography>
              <List>
                {data.topicsPopular.map((topic, index) => (
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
