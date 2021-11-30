import Comment from './Comment'

const CommentsList = (props) => {
    return(        
        <div>
        { props.comments.map(comment => (
            <Comment refreshComments={props.refreshComments} postID={props.postID} key={comment.id} id={comment.id} comment={comment.comment} creator={comment.creator} creatorID={comment.creatorID} />
        ))}
        </div>
    )
}

export default CommentsList;