// ContextProvider encapsulated

import { createContext, useState } from "react";
import {
  getInfoFromToken,
  getTokenFromLocalStorage,
} from "../services/publicServices";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(
    getInfoFromToken(getTokenFromLocalStorage()).user
  );
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
