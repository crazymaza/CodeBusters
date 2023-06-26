import {
  ModalProps as MUIModalProps,
  Modal as MUIModal,
  Box,
} from '@mui/material'
import { FC } from 'react'

type ModalProps = FC<MUIModalProps>

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '15px',
  p: 4,
}

const Modal: ModalProps = ({ children, ...props }) => {
  return (
    <MUIModal {...props}>
      <Box sx={style}>{children}</Box>
    </MUIModal>
  )
}

export default Modal
