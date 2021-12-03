import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import CommentsList from './CommentsList';

const Post = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(false);
    const auth = useContext(AuthContext);

    // set state of showing comments
    const commentsClickHandler = () => {
        setShowComments(!showComments);
    };

    // set comments for post
    useEffect(() => {
        const fetchData = async () => {
            const responseData = await sendRequest(
            `${process.env.REACT_APP_SERVER_URL}/posts/${props.id}/comments`,
            "GET",
            );
            setComments(responseData);
        }
        fetchData();
    }, [comments.length, props.id]);

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
                JSON.stringify({comment: newComment, creator: auth.fullName, creatorID: auth.userId}),
                {
                    "Content-Type": "application/json",
                }
            );
            setNewComment("");
            setComments(responseData);
        }
    };

    const convertMongoDate = (date) => {
        // 2021-12-02T18:28:33.463Z
        let time = date.substring(11, 16);
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        return `${time} ${month}/${day}/${year}`;
    };

    return (
        <div style={{marginBottom: "2rem"}}>
            <Paper style={{padding: "2rem", paddingBottom: "1rem"}} elevation={2}>
                <div style={{paddingBottom: "1rem"}}>
                    <div style={{display: "inline-block", fontSize: "1.5rem", fontWeight:"bold"}}>{props.title}</div>
                    <div style={{fontStyle: "italic", display: "inline-block", fontSize: "0.75rem", marginLeft: "3rem"}}>{props.author}</div>
                    <div style={{display: "inline-block", fontSize: "1.5rem", float:"right"}}>{convertMongoDate(props.date)}</div>
                </div>
                <div style={{paddingBottom: "1rem"}}>
                    {props.postBody}
                </div>
                <Divider />
                <div style={{display: "inline-block", marginTop: "0.5rem"}}>
                    <p 
                    onMouseEnter={()=>{document.getElementById("root").style.cursor = "pointer"}}
                    onMouseLeave={()=>{document.getElementById("root").style.cursor = null}}
                    onClick={commentsClickHandler}
                    >
                    Comments ({comments.length})
                    </p>
                </div>
                <div style={{display: "inline-block", marginTop: "0.5rem", float: "right"}}>
                    2 min read            
                </div>
                {showComments && (
                    <>
                    <CommentsList refreshComments={refreshComments} postID={props.id} comments={comments}/>
                    {auth.isLoggedIn && (
                        <TextField onKeyDown={keyDownHandler} value={newComment} onChange={newCommentHandler} fullWidth placeholder="Type your comment and hit enter" style={{display:"inline-flex"}} />
                    )}
                    </>
                )}
            </Paper>
        </div>
    )
}

export default Post;