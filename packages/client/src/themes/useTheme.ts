import { ThemeNameEnum } from './types'

// TODO В дальнейшем хук должн быть переделан и реализован через стор. Текущая реализация для примера
export default function useTheme() {
  const switchTheme = () => {
    const htmlContainer = document.querySelector('html')

    htmlContainer?.classList.toggle(`theme-${ThemeNameEnum.LIGHT}`)
    htmlContainer?.classList.toggle(`theme-${ThemeNameEnum.DARK}`)
  }

  return [switchTheme] as const
}
