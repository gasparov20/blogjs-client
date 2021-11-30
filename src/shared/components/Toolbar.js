import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

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

const Toolbar = () => {
  const auth = useContext(AuthContext);

  return (
    <AppBar position="absolute" display="flex">
      <ToolBar>
        <div style={{ display: "contents", float: "left" }}>
          <ThemeProvider theme={loginTheme}>
            <Typography
              color="primary"
              component={Link}
              to={"/"}
              style={{
                textDecoration: "none",
                flex: 1,
                padding: "1rem",
                paddingLeft: "0",
              }}
              variant="h3"
            >
              blog.js
            </Typography>
          </ThemeProvider>
        </div>
        <div style={{ display: "flex", float: "right" }}>
          {!auth.isLoggedIn && (
            <React.Fragment>
              <ThemeProvider theme={loginTheme}>
                <Link to="/login">
                  <Button style={{ float: "right" }} color="primary">
                    Login
                  </Button>
                </Link>
              </ThemeProvider>
              <ThemeProvider theme={registerTheme}>
                <Link to="/register">
                  <Button style={{ float: "right" }} color="primary">
                    Register
                  </Button>
                </Link>
              </ThemeProvider>
            </React.Fragment>
          )}
          {auth.isLoggedIn && (
            <React.Fragment>
              <div
                style={{
                  display: "inline-block",
                  paddingRight: "5rem",
                  justifyContent: "center",
                }}
              >
                Hello, {auth.firstName}
              </div>
              <ThemeProvider theme={loginTheme}>
                <Link to="/logout">
                  <Button style={{ float: "right" }} color="primary">
                    Logout
                  </Button>
                </Link>
              </ThemeProvider>
            </React.Fragment>
          )}
        </div>
      </ToolBar>
    </AppBar>
  );
};

export default Toolbar;
