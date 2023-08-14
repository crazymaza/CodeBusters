import { Comment, IComment } from '../model'

export class CommentService {
  public async getAllTopicCommnets(topicId: number) {
    return Comment.findAll({
      where: {
        topicId,
      },
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
    })
  }
}
