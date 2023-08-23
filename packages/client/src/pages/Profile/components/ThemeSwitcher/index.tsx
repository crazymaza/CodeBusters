import { useMemo, useCallback } from 'react'
import { Switch } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/store/typedHooks'
import { ThemeNameEnum } from '@/api/Theme/types'
import { selectThemeName } from '@/store/slices/themeSlice/selectors'
import { setTheme } from '@/store/slices/themeSlice/thunks'

import classNames from 'classnames/bind'
import styles from '@/pages/Profile/styles.module.scss'

export type ThemeSwitcherProps = {
  label: string
}

const cx = classNames.bind(styles)

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ label }) => {
  const themeName = useAppSelector(selectThemeName)

  const dispatch = useAppDispatch()

  const isChecked = useMemo(() => {
    return themeName === ThemeNameEnum.DARK
  }, [themeName])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    const updatedThemeName = checked ? ThemeNameEnum.DARK : ThemeNameEnum.LIGHT

    dispatch(setTheme({ themeName: updatedThemeName }))
  }, [])

  return (
    <div className={cx('user__settings_theme')}>
      <span>{label}</span>
      <Switch checked={isChecked} onChange={onChange} />
    </div>
  )
}

export default ThemeSwitcher
