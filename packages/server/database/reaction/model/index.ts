import { User } from '../../user'
import { Comment } from '../../comment'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

export interface IReaction {
  id?: number
  commentId?: number
  userId?: number
  reaction?: string
}

@Table({ tableName: 'reactions' })
export class Reaction extends Model<Reaction, IReaction> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @Column(DataType.TEXT)
  declare reaction: string

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'commentId',
  })
  declare commentId: number

  @BelongsTo(() => Comment, {
    onDelete: 'CASCADE',
  })
  declare comment: Comment

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}
