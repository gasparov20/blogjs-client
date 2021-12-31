import { Avatar } from "@mui/material";
import { useContext, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import DeleteDialog from "./DeleteDialog";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import React from "react";
import ReactDOM from "react-dom";

import "./Comment.css";

const Comment = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [rowColor, setRowColor] = useState({ backgroundColor: "white" });
  const navigate = useNavigate();

  // sends request to server to delete a comment
  const deleteHandler = useCallback(async () => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/posts/${props.postID}/comments/${props.id}`,
      "DELETE",
      null,
      {
        Authorization: "Bearer " + auth.token,
      }
    );
    props.refreshComments(responseData);
  }, [sendRequest, auth.token, props]);

  return (
    <div className="comment-row" style={rowColor} key={props.id}>
      <div style={{}}>
        {!!props.creatorID && (
          <div
            style={{ display: "flex", alignItems: "center", height: "40px" }}
          >
            <div
              className="nameplate"
              onMouseEnter={() => {
                document.getElementById("root").style.cursor = "pointer";
              }}
              onMouseLeave={() => {
                document.getElementById("root").style.cursor = null;
              }}
              onClick={() => {
                navigate(`/users/${props.creatorID._id || props.creatorID.id}`);
              }}
            >
              <Avatar
                sx={{ width: "30px", height: "30px", marginRight: "2px" }}
                src={
                  props.creatorID.image === ""
                    ? ""
                    : props.creatorID.image.includes("/uploads/images")
                    ? `${process.env.REACT_APP_STATIC_URL}${props.creatorID.image}`
                    : props.creatorID.image
                }
              />
              <div style={{ fontWeight: "500" }}>
                {`${props.creatorID.firstName} ${props.creatorID.lastName}`}
              </div>
            </div>
            <div style={{ marginLeft: "8px" }}>{props.comment}</div>
          </div>
        )}
      </div>
      <div style={{ flexGrow: 1 }}></div>
      {(auth.userType === "admin" ||
        auth.userId === props.creatorID._id ||
        auth.userId === props.creatorID._id) && (
        <DeleteDialog
          type="comment"
          onMouseEnter={() => {
            setRowColor({ backgroundColor: "#F4F4F4" });
          }}
          onMouseLeave={() => {
            setRowColor({ backgroundColor: "white" });
          }}
          callback={deleteHandler}
        />
      )}
    </div>
  );
};

export default Comment;
