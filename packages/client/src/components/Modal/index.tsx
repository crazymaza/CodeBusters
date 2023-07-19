import {
  ModalProps as MUIModalProps,
  Modal as MUIModal,
  Box,
} from '@mui/material'
import { FC } from 'react'
import styles from './style.module.scss'
import classNames from 'classnames/bind'

type ModalProps = FC<MUIModalProps>

const cx = classNames.bind(styles)

const Modal: ModalProps = ({ children, ...props }) => {
  return (
    <MUIModal {...props} className={cx('modal__component')}>
      <Box className={cx('modal__component_content')}>{children}</Box>
    </MUIModal>
  )
}

export default Modal
