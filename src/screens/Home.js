import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/userContext";

export default function Home() {
  const userInfo = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo) navigate('/board')
  }, [userInfo, navigate])
  
  return (
    <div className="home w-full h-screen flex justify-center items-center">
      <div className="md:container md:mx-auto">
        <h2 className="home__title text-white text-center uppercase text-5xl lg:text-8xl">Todas tus tareas en un solo lugar</h2>
      </div>
    </div>
  );
};
