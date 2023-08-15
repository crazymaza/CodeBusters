import { User } from '../../user'
import { Topic } from '../../topic'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { Reaction } from '../../reaction'
import { Reply } from '../../reply'

export interface IComment {
  id?: number
  topicId?: number
  userId?: number
  text?: string
  parentCommentId?: number
}

export interface ITreeComment {
  comment: Comment
  replies: Comment[]
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
    field: 'topic_Id',
  })
  declare topicId: number

  @BelongsTo(() => Topic, {
    onDelete: 'CASCADE',
  })
  declare topic: Topic

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_Id',
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User

  @HasMany(() => Reaction)
  declare reaction: Reaction

  @HasMany(() => Reply)
  declare reply: Reply
}
