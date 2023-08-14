import sequelize from 'sequelize/types/sequelize'
import { ITopic, Topic } from '../model'
import { Comment } from '../../comment'

export class TopicService {
  public async getAllTopics() {
    return Topic.findAll()
  }

  public async addTopic(topic: ITopic) {
    return Topic.create({
      title: topic.title,
      description: topic.description,
      userId: topic.userId,
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
    return Comment.findAll({
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('topicId')), 'topics']],
      },
      group: ['topicId'],
      order: ['topics', 'DESC'],
      limit: 5,
    })
  }
}
