import Comment from '../../comment/model'
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'

export interface IReply {
  id?: number
  commentId?: number
  responseId?: number
}

@Table({ tableName: 'replies' })
class Reply extends Model<Reply, IReply> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'commentId',
  })
  declare commentId: number

  @BelongsTo(() => Comment)
  declare comment: Comment

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'responseId',
  })
  declare responseId: number

  @BelongsTo(() => Comment)
  declare response: Comment
}

export default Reply
