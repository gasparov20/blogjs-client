import Comment from "./Comment";
import React from "react";
import ReactDOM from "react-dom";
import "./CommentsList.css";

const CommentsList = (props) => {
  return (
    <div className="list">
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
