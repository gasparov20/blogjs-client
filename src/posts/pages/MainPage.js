import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Welcome from "../components/Welcome";
import PostsList from "../components/PostsList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { AuthContext } from "../../shared/context/auth-context";

const MainPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [posts, setPosts] = useState([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_SERVER_URL}/posts/all`,
          "GET",
        );
        setPosts(responseData);
      } catch (err) {
        console.log(err.message);
      } 
    };
    fetchData();
  }, [posts.length]);

  async function createPostClickHandler() {
    navigate("/create");
  }

  async function deleteHandler() {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/posts/`,
      "DELETE",
      );


    setPosts([]);
  }

  const welcomeString =
    "Vitae tortor condimentum lacinia quis vel eros donec ac. Duis at consectetur lorem donec massa. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Elit ut aliquam purus sit. Quisque egestas diam in arcu cursus euismod.";

  return (
    <>
      <div>
        {auth.isLoggedIn && (
          <Button onClick={createPostClickHandler}>Create Post</Button>
        )}
        <Welcome text={welcomeString} />
        <PostsList posts={posts} />
        {auth.isLoggedIn && auth.userType==='admin' && (
          <Button onClick={deleteHandler}>Delete All Posts</Button>
        )}
      </div>
    </>
  );
};

export default MainPage;
