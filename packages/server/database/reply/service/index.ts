import { IReply, Reply } from '../model'

export class ReplyService {
  public async addReply(reply: IReply) {
    return Reply.create({
      commentId: reply.commentId,
      responseId: reply.responseId,
    })
  }
}
