import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import { addNewTopic } from '@/store/slices/forumSlice/thunks'
import { selectUserInfo } from '@/store/slices/userSlice/selectors'
import { useAppDispatch, useAppSelector } from '@/store/typedHooks'
import { TextField } from '@mui/material'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type CloseButtonProps = {
  open: boolean
  handleCloseDialog: () => void
}

const DialogComponent = (props: CloseButtonProps) => {
  const user = useAppSelector(selectUserInfo)
  const dispatch = useAppDispatch()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const createTopicData = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      userId: user?.id ?? 0,
    }

    await dispatch(addNewTopic(createTopicData))
    props.handleCloseDialog()
  }

  return (
    <Dialog open={props.open} title="Создание новой темы">
      <form className={cx('dialog__form-container')} onSubmit={onSubmit}>
        <TextField
          name="title"
          margin="dense"
          id="title"
          label="Название темы"
          fullWidth
          variant="standard"
          className={cx('dialog__form-textfield')}
        />
        <TextField
          name="description"
          margin="dense"
          id="description"
          label="Описание темы"
          fullWidth
          variant="standard"
          className={cx('dialog__form-textfield')}
        />
        <div className={cx('buttons-container')}>
          <Button type="submit" variant="contained">
            Создать
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={props.handleCloseDialog}>
            Отмена
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default DialogComponent
