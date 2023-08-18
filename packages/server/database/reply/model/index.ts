import { Comment } from '../../comment'
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
export class Reply extends Model<Reply, IReply> {
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
    field: 'comment_Id',
  })
  declare commentId: number

  @BelongsTo(() => Comment)
  declare comment: Comment

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'response_Id',
  })
  declare responseId: number

  @BelongsTo(() => Comment)
  declare response: Comment
}
