import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Welcome from "../../posts/components/Welcome";

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
    console.log(responseData);
    setBusy(false);
  }, [auth.token, id, sendRequest]);

  // Retrieve user when mounted
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {busy ? (
        <LinearProgress />
      ) : (
        <Welcome
          text={
            "This is " + user.firstName + " " + user.lastName + "'s profile"
          }
        />
      )}
    </>
  );
};

export default UserProfile;
