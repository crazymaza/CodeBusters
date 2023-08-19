import { useEffect } from 'react'
import { useAppSelector } from '@/store/typedHooks'
import { selectThemeName } from '@/store/slices/themeSlice/selectors'
import { ThemeNameEnum } from '@/api/Theme/types'

export default function useTheme() {
  const themeName = useAppSelector(selectThemeName)

  const setAppTheme = (themeName: ThemeNameEnum) => {
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
