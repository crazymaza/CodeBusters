import {
  IconButton as MUIIconButton,
  Avatar as MUIAvatar,
  AvatarProps as MUIAvatarProps,
} from '@mui/material'
import AvatarIcon from 'icons/stub_avatar.png'
import { FC } from 'react'
import styles from './style.module.scss'
import classNames from 'classnames/bind'

type Props = {
  changeAvatar?: (ev: React.ChangeEvent<HTMLInputElement>) => void
} & MUIAvatarProps

type AvatarProps = FC<Props>

const cx = classNames.bind(styles)

const Avatar: AvatarProps = ({ children, changeAvatar, ...props }) => {
  const avatarSrc =
    props.src !== null
      ? `${window.location.origin}/api/v2/resources${props.src}`
      : AvatarIcon

  return (
    <>
      <input
        accept="image/*"
        id="upload-avatar-file"
        type="file"
        hidden
        onChange={changeAvatar}
        data-testid="avatar-test-id"
      />
      <label htmlFor="upload-avatar-file">
        <MUIIconButton aria-label="upload picture" component="span">
          <MUIAvatar
            className={cx('avatar__component')}
            {...props}
            src={avatarSrc}>
            {children}
          </MUIAvatar>
        </MUIIconButton>
      </label>
    </>
  )
}

export default Avatar
