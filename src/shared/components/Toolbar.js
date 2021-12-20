import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Toolbar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loginTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  const registerTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  const registerClickHandler = () => {
    navigate("/register");
  };

  const loginClickHandler = () => {
    navigate("/login");
  };

  return (
    <AppBar>
      <ToolBar>
        <Box display="flex" flexGrow={1}>
          <ThemeProvider theme={loginTheme}>
            <Typography
              style={{ textDecoration: "none" }}
              color="primary"
              component={Link}
              to={"/"}
              variant="h3"
            >
              blog.js
            </Typography>
          </ThemeProvider>
        </Box>
        {!auth.isLoggedIn && (
          <>
            <ThemeProvider theme={loginTheme}>
              <Button color="primary" onClick={loginClickHandler}>
                Login
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={registerTheme}>
              <Button color="primary" onClick={registerClickHandler}>
                Register
              </Button>
            </ThemeProvider>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <p style={{ marginRight: "30px" }}>Hello, {auth.userFirstName}</p>
            <ThemeProvider theme={loginTheme}>
              <Button color="primary" onClick={auth.logout}>
                Logout
              </Button>
            </ThemeProvider>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
};

export default Toolbar;
