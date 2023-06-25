import {
  IconButton as MUIIconButton,
  Avatar as MUIAvatar,
  AvatarProps as MUIAvatarProps,
} from '@mui/material'
import { FC } from 'react'

type OwnProps = {
  changeAvatar?: (ev: React.ChangeEvent<HTMLInputElement>) => void
} & MUIAvatarProps

type AvatarProps = FC<OwnProps>

const Avatar: AvatarProps = ({ children, ...props }) => {
  const { changeAvatar, ...otherProps } = props

  return (
    <>
      <input
        accept="image/*"
        id="upload-avatar-file"
        type="file"
        hidden
        onChange={changeAvatar}
      />
      <label htmlFor="upload-avatar-file">
        <MUIIconButton aria-label="upload picture" component="span">
          <MUIAvatar
            src={'../../src/assets/images/stub_avatar.png'}
            {...otherProps}>
            {children}
          </MUIAvatar>
        </MUIIconButton>
      </label>
    </>
  )
}

export default Avatar
