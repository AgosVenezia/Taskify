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
      return axios
        .post("/api/users", data)
        .then((res) => {
          setCredentials(res.data.user)
          return res
        })
        .catch((err) => err);
    },
    delete: async () => {
      return axios
        .delete("/api/users")
        .then((res) => {
          clearCredentials()
          return res
        })
        .catch((err) => err);
    },
    login: async (data) => {
      return axios
        .post("/api/users/auth", data)
        .then((res) => {
          setCredentials(res.data.user)
          return res
        })
        .catch((err) => err);
    },
    logout: async () => {
      return axios
        .post("/api/users/logout")
        .then((res) => {
          clearCredentials()
          return res
        })
        .catch((err) => err);
    },
    update: async (data) => {
      return axios
        .put("/api/users/profile", data)
        .then((res) => {
          setCredentials(res.data.user)
          return res
        })
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
export const useDelete = () => useContextSelector(UserContext, (ctx) => ctx.delete);
export const useLogin = () => useContextSelector(UserContext, (ctx) => ctx.login);
export const useLogout = () => useContextSelector(UserContext, (ctx) => ctx.logout);
export const useUpdate = () => useContextSelector(UserContext, (ctx) => ctx.update);
