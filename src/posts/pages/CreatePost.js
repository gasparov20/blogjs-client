import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Welcome from "../../posts/components/Welcome";
import "./CreatePost.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const CreatePost = () => {
  const [convertedText, setConvertedText] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const titleChangedHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const postChangedHandler = (event) => {
    setConvertedText(event);
  };

  const fakeTitle = "Test Post";
  const fakeBody = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const nameData = await sendRequest(`${process.env.REACT_APP_SERVER_URL}/users/${auth.userId}`, "GET");
      const responseData = await sendRequest(
      `${process.env.REACT_APP_SERVER_URL}/posts/create`,
      "POST",
      JSON.stringify({
        title: enteredTitle === "" ? fakeTitle : enteredTitle,
        postBody: convertedText === "" ? fakeBody : convertedText,
        creator: nameData.name,
        creatorID: auth.userId,
        comments: [],
        reactions: [],
      }),
      {
        "Content-Type": "application/json",
      }
    );
    } catch (err) {}
    navigate("/");
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
        <div style={{ backgroundColor: "white" }}>
          <ReactQuill
            theme="snow"
            placeholder={"Start creating your masterpiece..."}
            value={convertedText}
            onChange={postChangedHandler}
          />
        </div>
        <div className="container">
          <Button type="submit" variant="contained" size="large">
            Submit Post
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
