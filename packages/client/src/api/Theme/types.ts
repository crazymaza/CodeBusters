export enum ThemeNameEnum {
  'LIGHT' = 'light',
  'DARK' = 'dark',
}

export type ThemeResponse = {
  theme: ThemeNameEnum
}

export type ThemeSetRequestParams = {
  themeName: ThemeNameEnum
}
