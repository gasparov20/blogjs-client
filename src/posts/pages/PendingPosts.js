import { Markup } from "interweave";
import {
  LinearProgress,
  Container,
  Pagination,
  Paper,
  Button,
} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import PostLite from "../components/PostLite";
import Welcome from "../components/Welcome";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const PendingPosts = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [pendingPosts, setPendingPosts] = useState([]); // need this
  const [currentPost, setCurrentPost] = useState(); // need this
  const [currentPostIndex, setCurrentPostIndex] = useState(0); // might not need
  const [numPosts, setNumPosts] = useState(props.numPendingPosts); // need this
  const [reloadPosts, setReloadPosts] = useState(false); // might not need
  const [busy, setBusy] = useState(true);

  // get pending posts
  useEffect(() => {
    setBusy(true);
    let responseData;
    const fetchData = async () => {
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/posts/pending/all`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
      } catch (err) {
        console.log("Fetch all posts: " + err.message);
      } finally {
        console.log(responseData);
        if (responseData.length === 0) {
          setNumPosts(0);
          setPendingPosts([]);
          setCurrentPost();
        } else {
          if (responseData.length !== numPosts) {
            setNumPosts(responseData.length);
          }
          setPendingPosts(responseData);
          setCurrentPost(responseData[currentPostIndex]);
        }
        setBusy(false);
      }
    };
    fetchData();
  }, [reloadPosts, auth.token, currentPostIndex, numPosts, sendRequest]);

  const approveHandler = async () => {
    let responseData;
    try {
      setBusy(true);
      // add post to published posts
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/posts/publish/${currentPost.id}`,
        "PUT",
        null,
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log("Approve post: " + err.message);
    } finally {
      setBusy(false);
      setReloadPosts(!reloadPosts);
    }
  };

  const rejectHandler = async () => {
    let responseData;
    try {
      setBusy(true);
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/posts/${currentPost.id}`,
        "DELETE",
        {
          creatorID: currentPost.creatorID._id,
        },
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log("Reject post: " + err.message);
    } finally {
      setBusy(false);
      setReloadPosts(!reloadPosts);
    }
  };

  const handlePagination = (event, page) => {
    setCurrentPostIndex(page - 1);
  };

  return busy ? (
    <div className="center-div">
      <LinearProgress />
    </div>
  ) : numPosts === 0 ? (
    <Welcome text={"No posts to moderate."} />
  ) : (
    <>
      <Welcome
        text={`You currently have ${numPosts} pending posts. When all posts have been evaluated, there may be more.`}
      />
      <PostLite
        key={pendingPosts[currentPostIndex].id}
        title={pendingPosts[currentPostIndex].title}
        postBody={<Markup content={pendingPosts[currentPostIndex].postBody} />}
        date={pendingPosts[currentPostIndex].createdAt}
        author={`${pendingPosts[currentPostIndex].creatorID.firstName} ${pendingPosts[currentPostIndex].creatorID.lastName}`}
      />
      <div className="center">
        <Button size="large" onClick={approveHandler}>
          Approve
        </Button>
        <Button size="large" onClick={rejectHandler}>
          Reject
        </Button>
      </div>
      <div className="center">
        <Pagination
          onChange={handlePagination}
          count={numPosts}
          size="large"
          variant="text"
        />
      </div>
    </>
  );
};

export default PendingPosts;
