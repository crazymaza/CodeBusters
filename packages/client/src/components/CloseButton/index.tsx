import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton as MUIIconButton } from '@mui/material'
import { IconButtonProps } from '@mui/material'
import styles from './styles.modules.scss'
import classNames from 'classnames'

const cx = classNames.bind(styles)

type CloseButtonProps = {
  onClick: (e: React.MouseEvent) => void
} & IconButtonProps

const CloseButton: React.FC<CloseButtonProps> = props => {
  return (
    <MUIIconButton className={cx('button-container')} onClick={props.onClick}>
      <HighlightOffIcon />
    </MUIIconButton>
  )
}

export default CloseButton
