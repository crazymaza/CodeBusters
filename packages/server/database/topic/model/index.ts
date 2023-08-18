import { User } from '../../user'
import { Comment } from '../../comment'
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript'

export interface ITopic {
  id?: number
  title?: string
  description?: string
  userId?: number
}

@Table({ tableName: 'topics' })
export class Topic extends Model<Topic, ITopic> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @Column(DataType.STRING)
  declare title: string

  @Column(DataType.TEXT)
  declare description: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_Id',
    allowNull: false,
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User

  @HasMany(() => Comment)
  declare comment: Comment
}
