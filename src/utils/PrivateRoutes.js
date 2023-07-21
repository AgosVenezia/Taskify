import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "../context/userContext";

const PrivateRoutes = () => {
  const userInfo = useUserInfo();

  return userInfo ? <Outlet/> : <Navigate to='/' replace />;
}

export default PrivateRoutes;
