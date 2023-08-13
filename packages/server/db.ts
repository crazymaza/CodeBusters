import Reaction from './database/reaction/model'
import Reply from './database/reply/model'
import Topic from './database/topic/model'
import User from './database/user/model'
import Comment from './database/comment/model'
import { Client } from 'pg'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: 'localhost',
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
    })

    await client.connect()

    const res = await client.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res?.rows?.[0].now)
    client.end()

    return client
  } catch (e) {
    console.error(e)
  }

  return null
}

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_DB,
  database: POSTGRES_PASSWORD,
  dialect: 'postgres',
  models: [User, Topic, Comment, Reply, Reaction],
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
