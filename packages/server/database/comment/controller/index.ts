import { CommentService } from '../service'
import { Comment, ITreeCommentElement } from '../model'
import { Request, Response } from 'express'

const commentService = new CommentService()

const getRootElements = (comments: Comment[]) => {
  return comments.filter(x => x.parentCommentId === null)
}

const getTopicCommentsTree = (comments: Comment[]) => {
  const result: ITreeCommentElement[] = []
  const rootComments = getRootElements(comments)
  rootComments.forEach(comment => {
    const treeRoot: ITreeCommentElement = {
      comment,
      replies: [],
    }
    const tree = getTopicCommentsTreeElements(comments, comment, treeRoot)
    result.push(tree)
  })
  return result
}

const getTopicCommentsTreeElements = (
  comments: Comment[],
  parentComment: Comment,
  result: ITreeCommentElement
) => {
  const childComments = comments.filter(
    x => x.parentCommentId === parentComment.id
  )

  if (childComments.length === 0) {
    return {
      comment: parentComment,
      replies: [],
    } as ITreeCommentElement
  } else {
    childComments.forEach(child => {
      const childLeaf = {
        comment: child,
        replies: [],
      }
      const replies = getTopicCommentsTreeElements(comments, child, childLeaf)
      result.replies.push(replies)
    })
  }
  return result
}

export class CommentController {
  public async getAllTopicComments(req: Request, res: Response) {
    const { topicId } = req.params
    try {
      const comments = await commentService.getAllTopicComments(Number(topicId))
      if (comments) {
        const treeComments = getTopicCommentsTree(comments)

        res.status(200).json(treeComments)
      } else {
        res.status(500)
        res.json({ error: 'Failed to get list of topic comments' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async addComment(req: Request, res: Response) {
    const { body } = req

    try {
      const newComment = await commentService.addComment(body)
      if (newComment) {
        res.status(201).json(newComment)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new comment' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }

  public async getComment(req: Request, res: Response) {
    const { commentId } = req.params

    try {
      const comment = await commentService.getComment(Number(commentId))

      if (comment) {
        res.status(200).json(comment)
      } else {
        res.status(500)
        res.json({ error: 'Failed to add new comment' })
      }
    } catch (err) {
      res.status(400)
      res.json({ error: (err as Error).message })
    }
  }
}
