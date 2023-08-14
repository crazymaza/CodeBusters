import { User } from '../../user'
import { Topic } from '../../topic'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

export interface IComment {
  id?: number
  topicId?: number
  userId?: number
  text?: string
  parentCommentId?: number
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, IComment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @Column(DataType.TEXT)
  declare text: string

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topicId',
  })
  declare topicId: number

  @BelongsTo(() => Topic, {
    onDelete: 'CASCADE',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}
