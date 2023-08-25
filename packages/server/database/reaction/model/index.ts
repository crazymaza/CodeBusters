import { User } from '../../user'
import { Comment } from '../../comment'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript'

export interface IReaction {
  id?: number
  comment_id?: number
  user_id?: number
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare reaction: string

  @ForeignKey(() => Comment)
  @Index
  @Column({
    type: DataType.INTEGER,
    field: 'comment_id',
    allowNull: false,
  })
  declare comment_id: number

  @BelongsTo(() => Comment, {
    onDelete: 'CASCADE',
  })
  declare comment: Comment

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
  })
  declare user_id: number

  @BelongsTo(() => User)
  declare user: User
}
