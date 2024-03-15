import Welcome from "../../posts/components/Welcome";
import React from "react";
import ReactDOM from "react-dom";

const AccessDenied = () => {
  const message = "You do not have permission to access this page.";
  return (
    <>
      <Welcome text={message} />
    </>
  );
};

export default AccessDenied;
