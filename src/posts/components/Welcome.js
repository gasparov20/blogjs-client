import Paper from "@mui/material/Paper";
import "./Welcome.css";
import React from "react";
import ReactDOM from "react-dom";

const Welcome = (props) => {
  return (
    <div style={{ margin: "50px" }}>
      <Paper className="center-div" style={{ padding: "30px" }} elevation={2}>
        <p style={{ fontSize: "1.25rem" }}>{props.text}</p>
      </Paper>
    </div>
  );
};

export default Welcome;
