import CloseButton from '@/components/CloseButton'
import MainStage from '@/components/MainStage'
import { MainLayout } from '@/layouts'
import {
  selectTopTopicsData,
  selectTopicsData,
} from '@/store/slices/forumSlice/selectors'
import {
  getAllTopics,
  getTopFiveTopics,
} from '@/store/slices/forumSlice/thunks'
import { useAppDispatch } from '@/store/typedHooks'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllTopics())
    dispatch(getTopFiveTopics())
  }, [])

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleClosePage = () => {
    navigate('/')
  }

  const topicsList = useSelector(selectTopicsData)
  const topicsPopular = useSelector(selectTopTopicsData)

  return (
    <MainLayout>
      <div className={cx('forumpage')}>
        <div className={cx('forumpage__container')}>
          <MainStage>
            <div className={cx('forumpage__wrapper')}>
              <div className={cx('blocktopics')}>
                <ForumTitle handleOpenDialog={handleOpenDialog} />
                <ForumBlockTopicsList data={topicsList} />
              </div>
              <hr />
              <div className={cx('topics-popular__container')}>
                <div className={cx('pagecontent-close')}>
                  <CloseButton onClick={handleClosePage} />
                </div>
                <ForumBlockPopular data={topicsPopular} />
              </div>
            </div>
          </MainStage>
        </div>
      </div>
      <div className="forum__dialog-new-post">
        <DialogComponent
          open={open}
          handleCloseDialog={handleCloseDialog}
          // handleSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </MainLayout>
  )
}

export default ForumPage
