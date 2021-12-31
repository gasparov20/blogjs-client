import {
  Paper,
  Avatar,
  Divider,
  TextField,
  Collapse,
  Link,
} from "@mui/material";
import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import CommentsList from "../../posts/components/CommentsList";
import DeleteDialog from "../../posts/components/DeleteDialog";
import { Markup } from "interweave";
import React from "react";
import ReactDOM from "react-dom";

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
        `${process.env.REACT_APP_SERVER_URL}/posts/${props.id}/comments/add`,
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
      style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "10px" }}
    >
      <div
        style={{
          fontSize: "18px",
        }}
      >
        {<Markup content={props.post.postBody} />}
      </div>
      <Divider style={{ margin: "15px" }} />
      <Link
        color="inherit"
        underline="hover"
        onClick={commentsClickHandler}
        onMouseEnter={() => {
          document.getElementById("root").style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.getElementById("root").style.cursor = null;
        }}
      >
        Comments ({comments.length})
      </Link>
      <Collapse in={showComments}>
        <>
          {comments.length > 0 && (
            <CommentsList
              refreshComments={refreshComments}
              postID={props.id}
              comments={comments}
            />
          )}
          <p style={{ display: "inline-block" }}>
            {!auth.isLoggedIn && comments.length === 0 && (
              <>No comments yet, log in to post one.</>
            )}
            {!auth.isLoggedIn && comments.length > 0 && (
              <>Log in to join the conversation.</>
            )}
            {auth.token === "unverified" && comments.length > 0 && (
              <>Verify your account to join the conversation.</>
            )}
          </p>
          {auth.isLoggedIn && auth.token !== "unverified" && (
            <TextField
              onKeyDown={keyDownHandler}
              value={newComment}
              onChange={newCommentHandler}
              fullWidth
              placeholder="Type your comment and hit enter"
              sx={{ marginTop: "20px" }}
            />
          )}
        </>
      </Collapse>
    </div>
  );
};

export default UserPost;
