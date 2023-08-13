import User from '../../user/model'
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'

export interface ITopic {
  id?: number
  title?: string
  description?: string
  userId?: number
}

@Table({ tableName: 'topics' })
class Topic extends Model<Topic, ITopic> {
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
    field: 'userId',
    allowNull: false,
  })
  declare userId: number

  @BelongsTo(() => User)
  declare user: User
}

export default Topic
