import { IReaction, Reaction } from '../model'

export class ReactionService {
  public async getCommentReactions(commentId: number) {
    return Reaction.findAll({
      where: {
        commentId,
      },
    })
  }

  public async addReaction(reaction: IReaction) {
    return Reaction.create({
      commentId: reaction.commentId,
      reaction: reaction.reaction,
      userId: reaction.userId,
    })
  }

  public async deleteReaction(reactionId: number) {
    return Reaction.destroy({
      where: {
        id: reactionId,
      },
    })
  }
}
