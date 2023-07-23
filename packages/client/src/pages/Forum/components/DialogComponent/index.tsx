import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import { TextField } from '@mui/material'
import classNames from 'classnames/bind'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

type CloseButtonProps = {
  open: boolean
  handleSubmit: (event: React.MouseEvent) => void
  handleCloseDialog: () => void
}

const DialogComponent = (props: CloseButtonProps) => {
  return (
    <Dialog open={props.open} title="Создание новой темы">
      <form
        className={cx('dialog__form-container')}
        onSubmit={e => e.preventDefault()}>
        <TextField
          name="topic_name"
          margin="dense"
          id="topic_name"
          label="Название темы"
          fullWidth
          variant="standard"
          className={cx('dialog__form-textfield')}
        />
        <TextField
          name="topic_description"
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
            onClick={props.handleSubmit}>
            Создать
          </Button>
          <Button
            type={'button'}
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
