import { UserTheme } from '../model'
import { Themes } from '../../themes/model'

export class ThemeService {
  public find = async (user_id: number) => {
    try {
      const result = await UserTheme.findOne({
        where: { user_id },
        include: [{ model: Themes, attributes: ['theme'] }],
      })

      return result
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }

  public upsert = async ({
    user_id,
    themeName,
  }: {
    user_id: number
    themeName: string
  }) => {
    try {
      const theme: Themes | null = await Themes.findOne({
        where: { theme: themeName },
      })

      if (!theme) {
        throw new Error('Such theme does not exist')
      }

      return await UserTheme.upsert({ theme_id: theme.id, user_id })
    } catch (e) {
      throw new Error((e as Error).message)
    }
  }
}

export const themeService = new ThemeService()
