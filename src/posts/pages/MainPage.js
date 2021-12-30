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
      responseData = await sendRequest(`/api/posts/all`, "GET");
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
      <Collapse in={props.successAlert}>
        <Alert variant="filled" severity="success">
          Your post has been submitted! All posts must go through our moderation
          team before being published.
        </Alert>
      </Collapse>
      <Collapse in={props.savedAlert}>
        <Alert variant="filled" severity="success">
          Your profile has been saved!
        </Alert>
      </Collapse>
      {auth.token === "unverified" && (
        <Alert severity="info" variant="filled">
          Welcome to The Blog! Please ask Andrew to verify your account to start
          posting and commenting (email verification under construction).
        </Alert>
      )}
      <Collapse in={!props.successAlert && !props.savedAlert}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {auth.isLoggedIn && auth.token != "unverified" && (
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                navigate("/create");
              }}
            >
              Create Post
            </Button>
          )}

          {auth.userType === "admin" && (
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                navigate("/publish");
              }}
            >
              Moderate Posts
            </Button>
          )}
        </div>
      </Collapse>
      <Welcome text={welcomeString} />
      {busy ? (
        <LinearProgress />
      ) : (
        <PostsList callback={fetchData} posts={posts} />
      )}
      <div className="footer">Copyright &copy; 2022 Andrew Gasparovich</div>
    </>
  );
};

export default MainPage;
