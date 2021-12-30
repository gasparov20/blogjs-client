import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./posts/pages/MainPage";
import PendingPosts from "./posts/pages/PendingPosts";
import ToolBar from "./shared/components/Toolbar";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import UserProfile from "./user/pages/UserProfile";
import EditProfile from "./user/pages/EditProfile";
import AccessDenied from "./user/pages/AccessDenied";
import CreatePost from "./posts/pages/CreatePost";
import { AuthContext } from "./shared/context/auth-context";
import { AlertContext } from "./shared/context/alert-context";
import { useHttpClient } from "./shared/hooks/http-hook";
import { useAlert } from "react-alert";

let logoutTimer;

const App = () => {
  const { sendRequest } = useHttpClient();
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);
  const [userVerified, setUserVerified] = useState(false);

  const login = useCallback(
    (userId, token, userFirstName, userType, expirationDate) => {
      setUserVerified(token === "unverified" ? false : true);
      setToken(token);
      setUserId(userId);
      setUserFirstName(userFirstName);
      setUserType(userType);

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 3600000);

      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userId,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    setUserFirstName(null);
    setUserType(null);
    setUserVerified(false);
    localStorage.removeItem("userData");
  }, []);

  // calculate time remaining on existing token
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const currentDate = new Date();
      const remainingTokenTime =
        tokenExpirationDate.getTime() - currentDate.getTime();
      logoutTimer = setTimeout(logout, remainingTokenTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  const getFirstName = useCallback(
    async (userId) => {
      let responseData;
      try {
        responseData = await sendRequest(`/api/users/${userId}`, "GET");
      } catch (err) {}
      setUserFirstName(responseData.firstName);
      setUserType(responseData.userType);
    },
    [sendRequest]
  );

  // auto-login
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      getFirstName(storedData.userId);
    }
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        userFirstName,
        userType,
        new Date(storedData.expiration)
      );
    }
  }, [login, getFirstName, userFirstName, userType]);

  const postSubmitted = useCallback(() => {
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 5000);
  }, []);

  const profileSaved = useCallback(() => {
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
    }, 3000);
  }, []);

  let routes;
  if (token !== "unverified" && userType === "admin") {
    routes = (
      <Fragment>
        <Routes>
          <Route exact path="/users/:id" element={<UserProfile />} />
          <Route
            path="/"
            element={
              <MainPage savedAlert={savedAlert} successAlert={successAlert} />
            }
            exact
          />
          <Route path="/create" element={<CreatePost />} exact />
          <Route path="/editprofile" element={<EditProfile />} exact />
          <Route
            path="/login"
            element={
              <MainPage savedAlert={savedAlert} successAlert={successAlert} />
            }
            exact
          />
          <Route path="/publish" element={<PendingPosts />} exact />
        </Routes>
      </Fragment>
    );
  } else if (token !== "unverified" && userVerified) {
    routes = (
      <Fragment>
        <Routes>
          <Route path="/users/:id" element={<UserProfile />} />
          <Route
            path="/"
            element={
              <MainPage savedAlert={savedAlert} successAlert={successAlert} />
            }
            exact
          />
          <Route path="/create" element={<CreatePost />} exact />
          <Route path="/editprofile" element={<EditProfile />} exact />
          <Route
            path="/login"
            element={
              <MainPage savedAlert={savedAlert} successAlert={successAlert} />
            }
            exact
          />
          <Route path="/publish" element={<AccessDenied />} exact />
        </Routes>
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Routes>
          <Route
            exact
            path="/users/:id"
            element={
              token === "unverified" ? <UserProfile /> : <AccessDenied />
            }
          />
          <Route path="/" element={<MainPage />} exact />
          <Route path="/create" element={<AccessDenied />} exact />
          <Route path="/editprofile" element={<AccessDenied />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/publish" element={<AccessDenied />} exact />
        </Routes>
      </Fragment>
    );
  }

  return (
    <AlertContext.Provider
      value={{
        setAlert: postSubmitted,
        setSavedAlert: profileSaved,
      }}
    >
      <AuthContext.Provider
        value={{
          userId: userId,
          userFirstName: userFirstName,
          userType: userType,
          isLoggedIn: !!token,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <ToolBar />
          <div className="main">{routes}</div>
        </Router>
      </AuthContext.Provider>
    </AlertContext.Provider>
  );
};

export default App;
