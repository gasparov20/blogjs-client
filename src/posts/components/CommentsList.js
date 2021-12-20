import Comment from "./Comment";

const CommentsList = (props) => {
  return (
    <div>
      {props.comments.map((comment) => (
        <Comment
          refreshComments={props.refreshComments}
          postID={props.postID}
          key={comment._id || comment.id}
          id={comment._id || comment.id}
          comment={comment.comment}
          creatorID={comment.creatorID}
        />
      ))}
    </div>
  );
};

export default CommentsList;
