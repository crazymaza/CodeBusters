import CloseButton from '@/components/CloseButton'
import MainStage from '@/components/MainStage'
import { MainLayout } from '@/layouts'
import classNames from 'classnames/bind'
import * as data from './data'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogComponent from './components/DialogComponent'
import ForumBlockPopular from './components/ForumBlockPopular'
import ForumBlockTopicsList from './components/ForumBlockTopicsList'
import ForumTitle from './components/ForumTitle'
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
                <ForumTitle handleOpenDialog={handleOpenDialog} />
                <ForumBlockTopicsList data={data.topicsList} />
              </div>
              <hr />
              <div className={cx('topics-popular__container')}>
                <div className={cx('pagecontent-close')}>
                  <CloseButton onClick={handleClosePage} />
                </div>
                <ForumBlockPopular data={data.topicsPopular} />
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
