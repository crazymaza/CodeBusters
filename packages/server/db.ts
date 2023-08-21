import { Reaction } from './database/reaction'
import { Topic } from './database/topic'
import { User } from './database/user'
import { Comment } from './database/comment'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST || 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_DB,
  database: POSTGRES_PASSWORD,
  dialect: 'postgres',
  models: [User, Topic, Comment, Reaction],
}

// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

export async function dbConnect() {
  try {
    await sequelize.authenticate() // Проверка аутентификации в БД
    await sequelize.sync() // Синхронизация базы данных

    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
