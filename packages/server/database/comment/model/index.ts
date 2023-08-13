import User from '../../user/model'
import Topic from '../../topic/model'
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
  creationDate?: Date
}

@Table({ tableName: 'comments' })
class Comment extends Model<Comment, IComment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @Column(DataType.TEXT)
  declare text: string

  @Column({
    type: DataType.DATE,
    defaultValue: Date.now,
  })
  declare creationDate: Date

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    field: 'topicId',
  })
  declare topicId: number

  @BelongsTo(() => Topic)
  declare topic: Topic

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}

export default Comment
