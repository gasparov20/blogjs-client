import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Welcome from "../../posts/components/Welcome";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { AlertContext } from "../../shared/context/alert-context";
import React from "react";
import ReactDOM from "react-dom";

const CreatePost = (props) => {
  const [convertedText, setConvertedText] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const alert = useContext(AlertContext);

  const titleChangedHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const postChangedHandler = (event) => {
    setConvertedText(event.target.value);
  };

  const fakeTitle = "Test Post";
  const fakeBody =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/posts/create`,
        "POST",
        JSON.stringify({
          title: enteredTitle === "" ? fakeTitle : enteredTitle,
          postBody: convertedText === "" ? fakeBody : convertedText,
          creatorID: auth.userId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      alert.setAlert();
      navigate("/");
    } catch (err) {
      console.log("Create post error: " + err);
    }
  };

  return (
    <>
      <Welcome text="" />
      <form onSubmit={postSubmitHandler}>
        <div style={{ backgroundColor: "white" }}>
          <TextField
            autoFocus
            type="text"
            style={{ display: "flex", marginBottom: "1rem" }}
            id="outlined-basic"
            variant="outlined"
            placeholder="Post title..."
            value={enteredTitle}
            onChange={titleChangedHandler}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "auto",
            flexDirection: "column",
            backgroundColor: "white",
          }}
        >
          <TextField
            multiline
            rows={5}
            placeholder="Start creating your masterpiece... And HTML is enabled!"
            onChange={postChangedHandler}
            sx={{ width: "auto" }}
          />
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "30px" }}
        >
          <Button type="submit" variant="contained" size="large">
            Submit Post
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
