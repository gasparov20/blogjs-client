import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

const alertOptions = {
  position: positions.TOP_CENTER,
  timeout: 8000,
  offset: "0px",
  transition: transitions.FADE,
  type: "success",
};

const alertStyle = {
  backgroundColor: "#FFFFFF",
  color: "black",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
  fontFamily: "Arial",
  width: "350px",
  boxSizing: "border-box",
};

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      <span style={{ flex: 2 }}>{message}</span>
    </div>
  );
};

const closeAlert = (alert) => {
  alert.remove(alert);
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App onClick={closeAlert} />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
