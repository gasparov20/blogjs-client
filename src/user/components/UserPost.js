import { Paper, Avatar, Divider, TextField } from "@mui/material";
import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import CommentsList from "../../posts/components/CommentsList";
import DeleteDialog from "../../posts/components/DeleteDialog";
import { Markup } from "interweave";

import "../../posts/components/Post.css";

const UserPost = (props) => {
  const { sendRequest } = useHttpClient();
  const [comments, setComments] = useState(props.post.comments);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // set state of showing comments
  const commentsClickHandler = () => {
    setShowComments(!showComments);
  };

  const newCommentHandler = (event) => {
    setNewComment(event.target.value);
  };

  const refreshComments = async (comments) => {
    setComments(comments);
  };

  // allows user to submit comment with enter key
  const keyDownHandler = async (event) => {
    if (event.keyCode === 13) {
      const responseData = await sendRequest(
        `/api/posts/${props.id}/comments/add`,
        "POST",
        JSON.stringify({
          comment: newComment,
          creatorID: auth.userId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      setNewComment("");
      setComments(responseData);
    }
  };

  const convertMongoDate = (date) => {
    let time = date.substring(11, 16);
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    return `${time} ${month}/${day}/${year}`;
  };

  return (
    <div
      style={{ marginLeft: "20px", marginBottom: "20px", marginRight: "20px" }}
    >
      <div
        style={{
          fontSize: "18px",
        }}
      >
        {<Markup content={props.post.postBody} />}
      </div>
      <Divider style={{ margin: "15px" }} />
      <p
        onMouseEnter={() => {
          document.getElementById("root").style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.getElementById("root").style.cursor = null;
        }}
        onClick={commentsClickHandler}
      >
        Comments ({comments.length})
      </p>
      {showComments && (
        <>
          {comments.length > 0 && (
            <CommentsList
              refreshComments={refreshComments}
              postID={props.id}
              comments={comments}
            />
          )}
          {!auth.isLoggedIn && comments.length === 0 && (
            <p style={{ display: "inline-block", paddingLeft: "20px" }}>
              No comments yet, log in to post one.
            </p>
          )}
          {!auth.isLoggedIn && comments.length > 0 && (
            <p style={{ display: "inline-block", paddingLeft: "20px" }}>
              Log in to join the conversation.
            </p>
          )}
          {auth.token === "unverified" && comments.length > 0 && (
            <p style={{ display: "inline-block", paddingLeft: "20px" }}>
              Verify your account to join the conversation.
            </p>
          )}
          {auth.isLoggedIn && auth.token !== "unverified" && (
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <TextField
                onKeyDown={keyDownHandler}
                value={newComment}
                onChange={newCommentHandler}
                fullWidth
                placeholder="Type your comment and hit enter"
                style={{ display: "inline-flex" }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPost;
