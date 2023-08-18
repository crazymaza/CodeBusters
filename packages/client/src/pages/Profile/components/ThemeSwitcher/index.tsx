import { useMemo, useCallback } from 'react'
import { Switch } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/store/typedHooks'
import {
  selectUserTheme,
  selectUserInfo,
} from '@/store/slices/userSlice/selectors'
import { ThemeNameEnum } from '@/themes/types'
import { setUserTheme } from '@/store/slices/userSlice/thunks'

import classNames from 'classnames/bind'
import styles from '@/pages/Profile/styles.module.scss'

export type ThemeSwitcherProps = {
  label: string
}

const cx = classNames.bind(styles)

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ label }) => {
  const user = useAppSelector(selectUserInfo)
  const themeName = useAppSelector(selectUserTheme)

  const dispatch = useAppDispatch()

  const isChecked = useMemo(() => {
    return themeName === ThemeNameEnum.DARK
  }, [themeName])

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked
      const nextThemeName = checked ? ThemeNameEnum.DARK : ThemeNameEnum.LIGHT

      dispatch(setUserTheme({ userId: user!.id, themeName: nextThemeName }))
    },
    [user]
  )

  return (
    <div className={cx('user__settings_theme')}>
      <span>{label}</span>
      <Switch checked={isChecked} onChange={onChange} />
    </div>
  )
}

export default ThemeSwitcher
