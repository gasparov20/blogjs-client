import { createContext } from "react";

export const AuthContext = createContext({
  userId: null,
  userFirstName: null,
  userType: null,
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});
