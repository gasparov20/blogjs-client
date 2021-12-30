import { useContext, useCallback, useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Comment.css";

const Comment = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [rowHighlight, setRowHighlight] = useState();

  // sends request to server to delete a comment
  const deleteHandler = useCallback(async () => {
    const responseData = await sendRequest(
      `/api/posts/${props.postID}/comments/${props.id}`,
      "DELETE",
      null,
      {
        Authorization: "Bearer " + auth.token,
      }
    );
    props.refreshComments(responseData);
  }, [sendRequest, auth.token, props]);

  return (
    <div
      className="comment-row"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      key={props.id}
    >
      <p
        style={{
          paddingLeft: "10px",
          flexGrow: "1",
        }}
      >
        {!!props.creatorID && (
          <strong>
            {`${props.creatorID.firstName} ${props.creatorID.lastName}`}:{" "}
          </strong>
        )}
        {props.comment}
      </p>
      {(auth.userType === "admin" ||
        auth.userId === props.creatorID._id ||
        auth.userId === props.creatorID._id) && (
        <DeleteDialog type="comment" callback={deleteHandler} />
      )}
    </div>
  );
};

export default Comment;
