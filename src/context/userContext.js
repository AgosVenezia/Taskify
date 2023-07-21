import { useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useUserContext = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('taskifyUserInfo')));

  const navigate = useNavigate();

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
          setCredentials(res.data)
          navigate('/board')
          return res
        })
        .catch((err) => err);
    },
    login: async (data) => {
      return axios
        .post("/api/users/auth", data)
        .then((res) => {
          setCredentials(res.data)
          navigate('/board')
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
