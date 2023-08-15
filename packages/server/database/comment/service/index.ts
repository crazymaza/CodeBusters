import { Reply } from '../../reply'
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
          model: Reply,
        },
        {
          model: User,
        },
      ],
    })
  }

  public async addComment(comment: IComment) {
    return await Comment.create({
      text: comment.text,
      topicId: comment.topicId,
      userId: comment.userId,
    })
  }

  public async getComment(commentId: number) {
    return await Comment.findOne({
      where: {
        id: commentId,
      },
      include: [
        {
          model: Reaction,
        },
        {
          model: Reply,
        },
      ],
    })
  }
}
