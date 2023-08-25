import { IReaction, Reaction } from '../model'

export class ReactionService {
  public async getCommentReactions(comment_id: number) {
    return Reaction.findAll({
      where: {
        comment_id,
      },
    })
  }

  public async addReaction({ comment_id, reaction, user_id }: IReaction) {
    return Reaction.create({
      comment_id,
      reaction,
      user_id,
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
