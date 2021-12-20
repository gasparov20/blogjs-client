import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button, LinearProgress, Alert, Collapse } from "@mui/material";
import Welcome from "../components/Welcome";
import PostsList from "../components/PostsList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "../../shared/style.css";

const MainPage = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [pendingPosts, setPendingPosts] = useState();
  const [busy, setBusy] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setBusy(true);
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/posts/all`,
        "GET"
      );
    } catch (err) {}
    const reversedPosts = responseData.reverse();
    setPosts(reversedPosts);
    setBusy(false);
  }, [sendRequest]);

  // Retrieve all posts when mounted
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const welcomeString =
    "Vitae tortor condimentum lacinia quis vel eros donec ac. Duis at consectetur lorem donec massa. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Elit ut aliquam purus sit. Quisque egestas diam in arcu cursus euismod.";

  return (
    <>
      {/* {props.successAlert && ( */}
      <Collapse in={props.successAlert}>
        <Alert variant="filled" severity="success">
          Your post has been submitted! All posts must go through our moderation
          team before being published.
        </Alert>
      </Collapse>
      {/* )} */}
      <Collapse in={!props.successAlert}>
        {auth.isLoggedIn && auth.token != "unverified" && (
          <div className="center">
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                navigate("/create");
              }}
            >
              Create Post
            </Button>
          </div>
        )}
        {auth.token === "unverified" && (
          <Alert severity="info" variant="filled">
            Welcome to The Blog! Please ask Andrew to verify your account to
            start posting and commenting (email verification under
            construction).
          </Alert>
        )}
      </Collapse>
      {auth.userType === "admin" && (
        <div className="center">
          <Button
            variant="contained"
            size="medium"
            onClick={() => {
              navigate("/publish");
            }}
          >
            Moderate Posts
          </Button>
        </div>
      )}
      <Welcome text={welcomeString} />
      {busy ? <LinearProgress /> : <PostsList posts={posts} />}
    </>
  );
};

export default MainPage;
