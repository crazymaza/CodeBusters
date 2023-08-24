/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  BelongsTo,
  Unique,
  ForeignKey,
} from 'sequelize-typescript'

import { User } from '../../user'
import { Themes } from '../../themes'

type UserThemeType = {
  id: number
  theme_id: number
  user_id: number
}

export type CreateUserThemeType = Omit<UserThemeType, 'id'>

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export class UserTheme extends Model<UserThemeType, CreateUserThemeType> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => Themes)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'theme_id',
  })
  declare theme_id: number

  @ForeignKey(() => User)
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  declare user_id: number

  @BelongsTo(() => Themes, 'theme_id')
  declare theme: Themes
}
