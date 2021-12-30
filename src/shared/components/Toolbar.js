import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  Typography,
  Box,
  Button,
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ToolBar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  const handleLogout = () => {
    setAnchorEl(null);
    auth.logout();
    navigate("/");
  };

  const handleEditProfile = () => {
    setAnchorEl(null);
    navigate("/editprofile");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar>
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
            <div>
              <ThemeProvider theme={loginTheme}>
                <Button
                  color="primary"
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  My Account
                </Button>
              </ThemeProvider>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ToolBar;
