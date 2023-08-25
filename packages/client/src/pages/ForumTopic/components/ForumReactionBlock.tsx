import { ReactionData } from '@/store/slices/forumSlice'

type ForumReactionBlockProps = {
  reactions: ReactionData[]
}

const ForumReactionBlock = (props: ForumReactionBlockProps) => {
  return (
    <div>
      {props.reactions.map((reaction, id) => (
        <div key={id}>
          {reaction.reaction}
          {reaction.count}
        </div>
      ))}
    </div>
  )
}

export default ForumReactionBlock
