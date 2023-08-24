import { User } from '../../user'
import { Topic } from '../../topic'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
} from 'sequelize-typescript'
import { Reaction } from '../../reaction'

export interface IComment {
  id?: number
  topic_id?: number
  user_id?: number
  text?: string
  parent_comment_id: number | null
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
  @Index
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
    allowNull: false,
  })
  declare topic_id: number

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
  declare user_id: number

  @BelongsTo(() => User)
  declare user: User

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'parent_comment_id',
    allowNull: true,
  })
  declare parent_comment_id: number

  @BelongsTo(() => Comment)
  declare comment: Comment

  @HasMany(() => Reaction)
  declare reaction: Reaction
}
