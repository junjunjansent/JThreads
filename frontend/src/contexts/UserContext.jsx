// ContextProvider encapsulated

import { createContext, useState, useEffect } from "react";
import { getInfoFromToken, getTokenFromLocalStorage } from "../utils/tokenUtil";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const { user } = getInfoFromToken(token);
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
