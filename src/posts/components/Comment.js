import { useContext, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Comment = (props) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // sends request to server to delete a comment
    const deleteHandler = async () => {
        const responseData = await sendRequest(
                `${process.env.REACT_APP_SERVER_URL}/posts/${props.postID}/comments/${props.id}`,
                "DELETE"
        );
        props.refreshComments(responseData);
    };

    return  <div key={props.id} style={{justifyItems:"center"}}>
                <p style={{display:"inline-block"}}><strong>{props.creator}: </strong>{props.comment}</p><p style={{display: "inline-block", float: "right"}}>{props.createdAt}</p>
                {((auth.userType==='admin') || (auth.fullName===props.creator)) && (
                <DeleteIcon onClick={deleteHandler} style={{display: "inline-block", float: "right"}} />
                )}
            </div>
};

export default Comment;