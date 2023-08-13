import Topic, { ITopic } from '../model'

class TopicService {
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
}

export default TopicService
