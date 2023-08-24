import Button from '@/components/Button'
import { addNewComment } from '@/store/slices/forumSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { TextField } from '@mui/material'
import classNames from 'classnames/bind'
import Picker from 'emoji-picker-react'
import { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const ForumAddCommentForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [isPickerVisible, setPickerVisible] = useState(false)
  const [inputStr, setInputStr] = useState('')
  const user = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()
  const { topicId } = useParams()

  // TODO: баг с курсором
  const handleEmojiClick = (emojiObject: any, event: MouseEvent) => {
    const cursor = (ref?.current && ref.current.selectionStart) ?? 0
    const text = inputStr.slice(0, cursor) + emojiObject.emoji
    setInputStr(text)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const topicIdNumber = topicId ? parseInt(topicId) : 0

    if (user) {
      const createCommentData = {
        topic_id: topicIdNumber,
        text: formData.get('text')?.toString() || '',
      }

      await dispatch(addNewComment(createCommentData))
      setInputStr('')
    }
  }

  return (
    <>
      <form className={cx('topicpage__form')} onSubmit={onSubmit}>
        <TextField
          className={cx('topicpage__form-textfield')}
          ref={ref}
          name="text"
          multiline={true}
          minRows={3}
          maxRows={3}
          placeholder="Введите ваш комментарий"
          value={inputStr}
          required
          onChange={e => setInputStr(e.target.value)}
        />
        <div className={cx('buttons-container')}>
          <Button onClick={() => setPickerVisible(!isPickerVisible)}>
            <SentimentSatisfiedAltIcon />
          </Button>
          <Button type="submit" variant="contained">
            Оставить комментарий
          </Button>
        </div>
      </form>
      <div className={cx('emoji-picker')}>
        <div className={cx('emoji-picker-container')}>
          {isPickerVisible ? (
            <Picker onEmojiClick={handleEmojiClick}></Picker>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default ForumAddCommentForm
