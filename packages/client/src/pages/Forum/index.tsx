import CloseButton from '@/components/CloseButton'
import { MainLayout } from '@/layouts'
import {
  Badge,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import TextField from '@/components/TextField'
import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import classNames from 'classnames/bind'
import Forum from 'icons/forum_light_theme.png'
import Zvezda from 'icons/zvezda.png'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as data from './data'
import styles from './styles.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { dialogSchema } from './validation'
import MainStage from '@/components/MainStage'

const cx = classNames.bind(styles)

const ForumPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleClosePage = () => {
    navigate('/')
  }

  const {
    control: modalControl,
    formState: { errors: modalErrors },
    handleSubmit: handleSubmit,
  } = useForm({
    resolver: yupResolver(dialogSchema),
    mode: 'all',
  })

  const renderDialog = () => (
    <Dialog open={open} title="Создание новой темы">
      <form
        className={cx('dialog__form-container')}
        onSubmit={e => e.preventDefault()}>
        <TextField
          name="topic_name"
          control={modalControl}
          fieldError={modalErrors['topic_name']}
          margin="dense"
          id="topic_name"
          label="Название темы"
          fullWidth
          variant="standard"
          className={cx('dialog__form-textfield')}
        />
        <TextField
          name="topic_description"
          // control={''}
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
            onClick={e => {
              handleSubmit
              e.preventDefault()
            }}>
            Создать
          </Button>
          <Button
            type={'button'}
            variant="contained"
            onClick={handleCloseDialog}>
            Отмена
          </Button>
        </div>
      </form>
    </Dialog>
  )

  return (
    <MainLayout>
      <div className={cx('forumpage')}>
        <div className={cx('forumpage-container')}>
          <MainStage>
            <div className={cx('forumpage-wrapper')}>
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
                        <ListItem
                          key={index}
                          className={cx('topics__list-item')}>
                          <Link to={`/forum/${index}`}>
                            <ListItemText
                              primary={title}
                              secondary={description}
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
                      )
                    )}
                  </Stack>
                </div>
              </div>

              <hr />
              <div className={cx('block-topics-popular')}>
                <div className={cx('page-content-close')}>
                  <CloseButton onClick={handleClosePage} />
                </div>
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
            </div>
          </MainStage>
        </div>
      </div>
      <div className="forum__dialog-new-post">{renderDialog()}</div>
    </MainLayout>
  )
}

export default ForumPage
