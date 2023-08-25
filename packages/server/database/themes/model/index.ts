/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  Model,
  AutoIncrement,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  Unique,
  Index,
} from 'sequelize-typescript'

type ThemesType = {
  id: number
  theme: string
  description: string
}

export type CreateThemesType = Omit<ThemesType, 'id'>

@Table({
  timestamps: false,
  tableName: 'themes',
})
export class Themes extends Model<ThemesType, CreateThemesType> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @AllowNull(false)
  @Unique
  @Index
  @Column(DataType.STRING)
  declare theme: string

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string
}
