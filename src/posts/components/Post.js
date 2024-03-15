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
import CommentsList from "./CommentsList";
import DeleteDialog from "./DeleteDialog";
import React from "react";
import ReactDOM from "react-dom";
import "./Post.css";

const Post = (props) => {
  const { sendRequest } = useHttpClient();
  const [comments, setComments] = useState(props.comments);
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

  // sends request to server to delete a post
  const deleteHandler = useCallback(async () => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/posts/${props.id}`,
      "DELETE",
      JSON.stringify({
        creatorID: props.creator._id,
      }),
      {
        Authorization: "Bearer " + auth.token,
        "Content-Type": "application/json",
      }
    );
    props.callback();
  }, [sendRequest, auth.token, props]);

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
    <div style={{ margin: "50px" }}>
      <Paper
        className="center-div"
        style={{
          paddingLeft: "30px",
          paddingTop: "10px",
          paddingRight: "30px",
          paddingBottom: "15px",
        }}
        elevation={2}
      >
        <div className="title">
          <p className="titleP">{props.title}</p>
          <div style={{ flexGrow: "1" }}></div>
          <p className="date">{convertMongoDate(props.date)}</p>          
          {((auth.isLoggedIn && auth.token) &&
            ((auth.userType && auth.userType === "admin") ||
            (auth.userId &&
              (auth.userId === props.creator.id ||
                auth.userId === props.creator._id)))) && (
            <DeleteDialog type="post" callback={deleteHandler} />
          )}
        </div>
        <div className="postBody">{props.postBody}</div>
        <Divider style={{ margin: "15px" }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            className="commentsLink"
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
          <div style={{ flexGrow: 1, alignItems: "right" }}></div>
          <div
            className="user"
            onMouseEnter={() => {
              document.getElementById("root").style.cursor = "pointer";
            }}
            onMouseLeave={() => {
              document.getElementById("root").style.cursor = null;
            }}
            onClick={() => {
              navigate(`/users/${props.creator._id || props.creator.id}`);
            }}
          >
            <div className="p">
              <Avatar
                src={
                  props.creator.image === ""
                    ? ""
                    : props.creator.image.includes("/uploads/images")
                    ? `${process.env.REACT_APP_STATIC_URL}${props.creator.image}`
                    : props.creator.image
                }
              />
            </div>
            <p className="author">{props.author}</p>
          </div>
        </div>
        <Collapse in={showComments}>
          {comments.length > 0 && (
            <CommentsList
              refreshComments={refreshComments}
              postID={props.id}
              comments={comments}
            />
          )}
          {!auth.isLoggedIn && comments.length === 0 && (
            <p className="commentMsg" style={{ display: "inline-block" }}>
              No comments yet, log in to post one.
            </p>
          )}
          {!auth.isLoggedIn && comments.length > 0 && (
            <p className="commentMsg" style={{ display: "inline-block" }}>
              Log in to join the conversation.
            </p>
          )}
          {auth.token === "unverified" && comments.length > 0 && (
            <p className="commentMsg" style={{ display: "inline-block" }}>
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
        </Collapse>
      </Paper>
    </div>
  );
};

export default Post;
