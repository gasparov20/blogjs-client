import { useContext, useCallback } from "react";
import DeleteCommentDialog from "./DeleteCommentDialog";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Comment = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

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
    <div style={{ display: "flex", flexDirection: "row" }} key={props.id}>
      <p style={{ paddingLeft: "20px", flexGrow: "1" }}>
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
        <DeleteCommentDialog callback={deleteHandler} />
      )}
    </div>
  );
};

export default Comment;
