import { useEffect } from 'react'
import { ThemeNameEnum } from './types'
import { useAppSelector } from '@/store/typedHooks'
import { selectUserTheme } from '@/store/slices/userSlice/selectors'
import { ThemeType } from '@/api/User/types'

export default function useTheme() {
  const themeName = useAppSelector(selectUserTheme)

  const setAppTheme = (themeName: ThemeType) => {
    const htmlContainer = document.querySelector('html')

    htmlContainer?.classList.remove(`theme-${ThemeNameEnum.LIGHT}`)
    htmlContainer?.classList.remove(`theme-${ThemeNameEnum.DARK}`)

    htmlContainer?.classList.add(`theme-${themeName}`)
  }

  useEffect(() => {
    if (themeName) {
      setAppTheme(themeName)
    }
  }, [themeName])

  return [themeName] as const
}
