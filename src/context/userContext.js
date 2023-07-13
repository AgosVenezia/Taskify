import { useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import axios from "axios";

const useUserContext = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('taskifyUserInfo')));

  const setCredentials = (credentials) => {
    if(localStorage.getItem('taskifyUserInfo')) {
      localStorage.removeItem('taskifyUserInfo')
    };

    localStorage.setItem('taskifyUserInfo',  JSON.stringify(credentials));

    setUserInfo(credentials);
  }

  const clearCredentials = () => {
    setUserInfo(null);
    localStorage.removeItem("taskifyUserInfo");
  }

  return {
    userInfo,
    register: async (data) => {
      return await axios
        .post("/api/users", data)
        .then((res) => res.data)
        .then((data) => setCredentials(data))
        .catch((err) => err);
    },
    login: async (data) => {
      return await axios
        .post("/api/users/auth", data)
        .then((res) => res.data)
        .then((data) => setCredentials(data))
        .catch((err) => err);
    },
    logout: async () => {
      return await axios
        .post("/api/users/logout")
        .then(() => clearCredentials())
        .catch((err) => err);
    }
  };
};

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => (
  <UserContext.Provider value={useUserContext()}>
    { children }
  </UserContext.Provider>
)

export const useUserInfo = () => useContextSelector(UserContext, (ctx) => ctx.userInfo);
export const useRegister = () => useContextSelector(UserContext, (ctx) => ctx.register);
export const useLogin = () => useContextSelector(UserContext, (ctx) => ctx.login);
export const useLogout = () => useContextSelector(UserContext, (ctx) => ctx.logout);
