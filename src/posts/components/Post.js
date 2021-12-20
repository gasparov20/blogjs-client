import { Paper, Avatar, Divider, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import CommentsList from "./CommentsList";
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
      <Paper className="center-div" style={{ padding: "30px" }} elevation={2}>
        <div className="title">
          <div className="post-header">
            <p
              style={{
                fontSize: "24px",
                fontWeight: "500",
                marginLeft: "20px",
                marginRight: "50px",
              }}
            >
              {props.title}
            </p>
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
                  src={`${process.env.REACT_APP_STATIC_URL}${props.creator.image}`}
                />
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  paddingLeft: "10px",
                }}
              >
                {props.author}
              </p>
            </div>
            <div style={{ flexGrow: "1" }}></div>
            <p style={{ fontSize: "18px", marginRight: "20px" }}>
              {convertMongoDate(props.date)}
            </p>
          </div>
        </div>
        <div
          style={{
            fontSize: "18px",
          }}
        >
          {props.postBody}
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
              <TextField
                onKeyDown={keyDownHandler}
                value={newComment}
                onChange={newCommentHandler}
                fullWidth
                placeholder="Type your comment and hit enter"
                style={{ display: "inline-flex" }}
              />
            )}
          </>
        )}
      </Paper>
    </div>
  );
};

export default Post;
