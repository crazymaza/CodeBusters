import { MainStage } from '@/components'
import { MainLayout } from '@/layouts'
import { Typography } from '@mui/material'
import classNames from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'
import * as data from './data'
import styles from './styles.module.scss'

import CloseButton from '@/components/CloseButton'
import ForumAddCommentForm from './components/ForumAddCommentForm'
import ForumCommentsBlock from './components/ForumCommentsBlock'

const cx = classNames.bind(styles)

const ForumTopicPage = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [isPickerVisible, setPickerVisible] = useState(false)
  const [inputStr, setInputStr] = useState('')
  const navigate = useNavigate()

  const handleCloseClick = () => navigate('/')

  const handleEmojiClick = (emojiObject: any, event: MouseEvent) => {
    const cursor = (ref?.current && ref.current.selectionStart) ?? 0
    const text = inputStr.slice(0, cursor) + emojiObject.emoji
    setInputStr(text)
  }

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
                Технологии
              </Typography>
              <ForumAddCommentForm />
              <Link className={cx('link-back')} to="/forum">
                &lt;К списку форумов
              </Link>
              <ForumCommentsBlock data={data.comments} />
            </div>
          </MainStage>
        </div>
      </div>
    </MainLayout>
  )
}

export default ForumTopicPage
