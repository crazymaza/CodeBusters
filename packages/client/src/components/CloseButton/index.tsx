import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton as MUIIconButton } from '@mui/material'

type CloseButtonProps = {
  onClick: (e: React.MouseEvent) => void
}

const CloseButton: React.FC<CloseButtonProps> = props => {
  return (
    <MUIIconButton onClick={props.onClick}>
      <HighlightOffIcon />
    </MUIIconButton>
  )
}

export default CloseButton
