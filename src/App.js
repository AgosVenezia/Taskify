import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserInfo, UserContextProvider } from "./context/userContext";
import Header from "./components/Header";

const App = () => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo) {
      navigate("/board")
    } else {
      navigate("/")
    }
  }, [navigate, userInfo]);

  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default function UserContextWrapper() {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  )
}
