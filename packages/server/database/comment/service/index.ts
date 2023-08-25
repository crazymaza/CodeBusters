import { Reaction } from '../../reaction'
import { Comment, IComment } from '../model'
import { User } from '../../user'

export class CommentService {
  public async getAllTopicComments(topic_id: number) {
    return Comment.findAll({
      where: {
        topic_id,
      },
      include: [
        {
          model: Reaction,
        },
        {
          model: User,
        },
      ],
    })
  }

  public async addComment({
    text,
    topic_id,
    user_id,
    parent_comment_id,
  }: IComment) {
    return Comment.create({
      text,
      topic_id,
      user_id,
      parent_comment_id,
    })
  }

  public async getComment(commentId: number) {
    return Comment.findOne({
      where: {
        id: commentId,
      },
      include: [
        {
          model: Reaction,
        },
      ],
    })
  }
}
