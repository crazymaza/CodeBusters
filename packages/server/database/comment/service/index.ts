import { Reaction } from '../../reaction'
import { Comment, IComment } from '../model'
import { User } from '../../user'

export class CommentService {
  public async getAllTopicComments(topicId: number) {
    return Comment.findAll({
      where: {
        topicId,
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
    topicId,
    userId,
    parentCommentId,
  }: IComment) {
    return Comment.create({
      text,
      topicId,
      userId,
      parentCommentId,
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
