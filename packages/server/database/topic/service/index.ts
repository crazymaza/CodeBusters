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

  public async addTopic({ description, title, userId }: ITopic) {
    return Topic.create({
      title,
      description,
      userId,
    })
  }

  public async deleteTopic(topicId: number) {
    return Topic.destroy({
      where: {
        id: topicId,
      },
    })
  }

  public async getTopTopics() {
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
      order: [['commentCount', 'DESC']],
    })
  }
}
