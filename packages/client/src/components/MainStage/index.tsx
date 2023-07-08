import { Paper as MUIPaper } from '@mui/material'
import { PaperProps as MUIPaperProps } from '@mui/material'
import classNames from 'classnames'
import styles from './styles.modules.scss'

const cx = classNames.bind(styles)

type Props = {
  width?: string
  height?: string
} & MUIPaperProps

type PaperProps = React.FC<Props>

const MainStage: PaperProps = ({ children, ...props }) => {
  return (
    <MUIPaper variant="outlined" square className={cx('mainstage__component')}>
      {children}
    </MUIPaper>
  )
}

export default MainStage
