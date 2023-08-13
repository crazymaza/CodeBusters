import { Column, DataType, Model, Table } from 'sequelize-typescript'

export interface IUser {
  id?: number
  displayName?: string
  firstName?: string
  secondName?: string
  avatar?: string
  theme?: number
}

@Table({ tableName: 'users' })
class User extends Model<User, IUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number

  @Column(DataType.STRING)
  declare displayName: string

  @Column(DataType.STRING)
  declare firstName: string

  @Column(DataType.STRING)
  declare secondName: string

  @Column(DataType.STRING)
  declare avatar: string

  @Column(DataType.STRING)
  declare theme: string
}

export default User
