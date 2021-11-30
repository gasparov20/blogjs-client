import { createContext } from "react";

export const AuthContext = createContext({
    userName: null,
    fullName: null,
    userId: null,
    userType: null,
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {}
});