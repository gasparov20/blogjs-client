import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import MainPage from "./posts/pages/MainPage";
import Toolbar from "./shared/components/Toolbar";
import Login from "./user/pages/Login";
import Register from "./user/pages/Register";
import CreatePost from "./posts/pages/CreatePost";
import Footer from "./shared/components/Footer";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userName, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [fullName, setFullname] = useState("");

  const login = useCallback((userId, token, userName, userType, fullName) => {
    setToken(token);
    setUserId(userId);
    setUsername(userName);
    setUserType(userType);
    setFullname(fullName);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setUserType(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Fragment>
      <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/create" element={<CreatePost />} exact />
      </Routes>
      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
      <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Register />} exact />
      </Routes>
      </Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        fullName: fullName,
        firstName: userName,
        userType: userType,
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="mainBody">
          <Toolbar />
          {routes}
        </div>
        <div style={{display:"flex", justifyContent: "center"}}>
          2021 Andrew Gasparovich
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
