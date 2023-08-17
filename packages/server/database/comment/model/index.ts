import { User } from '../../user'
import { Topic } from '../../topic'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { Reaction } from '../../reaction'

export interface IComment {
  id?: number
  topicId?: number
  userId?: number
  text?: string
  parentCommentId: number | null
}

export interface ITreeCommentElement {
  comment: IComment
  replies: ITreeCommentElement[]
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare text: string

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
    allowNull: false,
  })
  declare topicId: number

  @BelongsTo(() => Topic, {
    onDelete: 'CASCADE',
  })
  declare topic: Topic

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'parent_comment_id',
    allowNull: true,
  })
  declare parentCommentId: number

  @BelongsTo(() => Comment)
  declare comment: Comment

  @HasMany(() => Reaction)
  declare reaction: Reaction
}
