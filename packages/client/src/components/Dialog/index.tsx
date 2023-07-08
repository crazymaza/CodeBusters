import { DialogContent, DialogTitle, Dialog as MUIDialog } from '@mui/material'
import { DialogProps as MUIDialogProps } from '@mui/material'
import styles from './style.module.scss'
import classNames from 'classnames/bind'
import { FC } from 'react'

type Props = {
  title?: string
} & MUIDialogProps

type DialogProps = FC<Props>

const cx = classNames.bind(styles)

const Dialog: DialogProps = ({ children, title, ...props }) => {
  return (
    <MUIDialog {...props} className={cx('dialog__component')}>
      <DialogTitle variant="h3">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MUIDialog>
  )
}

export default Dialog
