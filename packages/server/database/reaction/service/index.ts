import { IReaction, Reaction } from '../model'

export class ReactionService {
  public async getCommentReactions(commentId: number) {
    return Reaction.findAll({
      where: {
        commentId,
      },
    })
  }

  public async addReaction({ commentId, reaction, userId }: IReaction) {
    return Reaction.create({
      commentId,
      reaction,
      userId,
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
