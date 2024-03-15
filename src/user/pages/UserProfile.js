import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress, Avatar, Paper } from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Welcome from "../../posts/components/Welcome";
import PostsAccordion from "../components/PostsAccordion";
import ReactDOM from "react-dom";

const UserPostsList = (props) => {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  let posts = [...props.posts].reverse();
  return (
    <>
      {posts?.map((post) => (
        <PostsAccordion key={post.id} post={post} callback={props.callback} />
      ))}
    </>
  );
};

const UserProfile = () => {
  const { id } = useParams();
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const [busy, setBusy] = useState(true);
  const [user, setUser] = useState();

  const fetchData = useCallback(async () => {
    setBusy(true);
    let responseData;
    try {
      responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/users/id/${id}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    setUser(responseData);
    setBusy(false);
  }, [auth.token, id, sendRequest]);

  // Retrieve user when mounted
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const convertMongoDate = (date) => {
    let time = date.substring(11, 16);
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    return `${month}/${day}/${year}`;
  };

  return (
    <>
      {busy ? (
        <LinearProgress />
      ) : (
        <>
          <Paper
            style={{ padding: "30px" }}
            onMouseEnter={() => {
              document.getElementById("root").style.cursor = null;
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Avatar
                sx={{ width: "150px", height: "150px" }}
                style={{ alignSelf: "center" }}
                src={
                  user.image === ""
                    ? ""
                    : user.image.includes("/uploads/images")
                    ? `${process.env.REACT_APP_STATIC_URL}${user.image}`
                    : user.image
                }
              />
              <div style={{ margin: "30px" }}>
                <p style={{ fontWeight: "600" }}>
                  {user.firstName} {user.lastName}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  Location:
                  <div
                    style={{
                      marginLeft: "5px",
                      fontStyle: "italic",
                    }}
                  >
                    {user.location === "" ? <>Nowhere-ville</> : user.location}
                  </div>
                </div>
                <p>Joined: {convertMongoDate(user.joined)}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "30px",
                  flexDirection: "row",
                  flexGrow: 1,
                }}
              >
                {user.bio === "" ? (
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "gray",
                      alignSelf: "center",
                      margin: "auto",
                    }}
                  >
                    {user.firstName} has not added a bio.
                  </p>
                ) : (
                  <p>{user.bio}</p>
                )}
              </div>
            </div>
          </Paper>
          <br />
          <UserPostsList callback={fetchData} posts={user.posts} />
        </>
      )}
    </>
  );
};

export default UserProfile;
