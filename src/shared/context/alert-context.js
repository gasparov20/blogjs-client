import { createContext } from "react";

export const AlertContext = createContext({
  setAlert: () => {},
  setSavedAlert: () => {},
});
