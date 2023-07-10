import { Button as MUIButton, ButtonProps } from '@mui/material'

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <MUIButton {...props}>{children}</MUIButton>
}

export default Button
