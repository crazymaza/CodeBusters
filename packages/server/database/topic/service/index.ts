import { ITopic, Topic } from '../model'
import { Comment } from '../../comment'
import { Sequelize } from 'sequelize-typescript'

export class TopicService {
  public async getAllTopics() {
    return Topic.findAll({
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('comment.id')), 'commentCount'],
        ],
      },
      include: [
        {
          model: Comment,
          attributes: [],
        },
      ],
      group: ['Topic.id'],
    })
  }

  public async getTopic(topicId: number) {
    return Topic.findByPk(topicId)
  }

  public async addTopic({ description, title, user_id }: ITopic) {
    return Topic.create({
      title,
      description,
      user_id,
    })
  }

  public async deleteTopic(topicId: number) {
    return Topic.destroy({
      where: {
        id: topicId,
      },
    })
  }
}
