import { MainStage } from '@/components'
import { MainLayout } from '@/layouts'
import { Typography } from '@mui/material'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

import CloseButton from '@/components/CloseButton'
import {
  selectCommentsData,
  selectCurrentTopicName,
} from '@/store/slices/forumSlice/selectors'
import {
  getCommentsByTopicId,
  getTopic,
} from '@/store/slices/forumSlice/thunks'
import { useAppDispatch } from '@/store/typedHooks'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ForumAddCommentForm from './components/ForumAddCommentForm'
import ForumCommentsBlock from './components/ForumCommentsBlock'

const cx = classNames.bind(styles)

const ForumTopicPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { topicId } = useParams()

  const commentsList = useSelector(selectCommentsData)
  const topicName = useSelector(selectCurrentTopicName)

  useEffect(() => {
    if (topicId) {
      dispatch(getTopic(parseInt(topicId)))
      dispatch(getCommentsByTopicId(parseInt(topicId)))
    }
  }, [])

  const handleCloseClick = () => navigate('/')

  return (
    <MainLayout>
      <div className={cx('topicpage')}>
        <div className={cx('topicpage-container')}>
          <MainStage>
            <div className={cx('topicpage-wrapper')}>
              <div className={cx('page-content-close')}>
                <CloseButton onClick={handleCloseClick} />
              </div>
              <Typography variant="h3" className={cx('topicpage-title')}>
                {topicName}
              </Typography>
              <ForumAddCommentForm />
              <Link className={cx('link-back')} to="/forum">
                &lt;К списку форумов
              </Link>
              <ForumCommentsBlock data={commentsList} />
            </div>
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default ForumTopicPage
