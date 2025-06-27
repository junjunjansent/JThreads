// ContextProvider encapsulated

import { createContext, useState, useEffect } from "react";
import {
  getInfoFromToken,
  getTokenFromLocalStorage,
} from "../services/publicServices";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      const userInfo = getInfoFromToken(token);
      setUser(userInfo);
    } else {
      setUser(null);
    }

    // const loadUser = async () => {
    //   try {
    //     const token = getTokenFromLocalStorage();
    //     if (token) {
    //       const userInfo = getInfoFromToken(token);
    //       if (userInfo && userInfo.user) {
    //         setUser(userInfo.user);
    //       }
    //     } else {
    //       setUser(null);
    //     }
    //   } catch (err) {
    //     console.error("Error loading user from token:", err);
    //     setUser(null);
    //   }
    // };

    // loadUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };
