import CloseButton from '@/components/CloseButton'
import MainStage from '@/components/MainStage'
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
import classNames from 'classnames/bind'
import Forum from 'icons/forum_light_theme.png'
import Zvezda from 'icons/zvezda.png'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DialogComponent from './components/DialogComponent'
import * as data from './data'
import styles from './styles.module.scss'

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <MainLayout>
      <div className={cx('forumpage')}>
        <div className={cx('forumpage__container')}>
          <MainStage>
            <div className={cx('forumpage__wrapper')}>
              <div className={cx('blocktopics')}>
                <div className={cx('forumpage-title')}>
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
                <div className={cx('blocktopics__wrapper')}>
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
              <div className={cx('blocktopics-popular')}>
                <div className={cx('pagecontent-close')}>
                  <CloseButton onClick={handleClosePage} />
                </div>
                <Paper
                  variant="outlined"
                  className={cx('blocktopics-popular__wrapper')}
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
      <div className="forum__dialog-new-post">
        <DialogComponent
          open={open}
          handleCloseDialog={handleCloseDialog}
          handleSubmit={handleSubmit}
        />
      </div>
    </MainLayout>
  )
}

export default ForumPage
