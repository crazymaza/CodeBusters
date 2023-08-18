import { UserTheme } from '../model'
import { Themes } from '../../themes/model'

export class ThemeService {
  public find = async (userId: number) => {
    try {
      const result = await UserTheme.findOne({
        where: { userId },
        include: [{ model: Themes, attributes: ['theme'] }],
      })

      return result
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  public upsert = async ({
    userId,
    themeName,
  }: {
    userId: number
    themeName: string
  }) => {
    try {
      const theme: Themes | null = await Themes.findOne({
        where: { theme: themeName },
      })

      if (!theme) {
        throw new Error('Such theme does not exist')
      }

      return await UserTheme.upsert({ themeId: theme.id, userId })
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }
}

export const themeService = new ThemeService()
