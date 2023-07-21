import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserInfo, useLogout } from '../context/userContext';
import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
} from "flowbite-react";
import { MdDashboardCustomize, MdSettings, MdLogout } from 'react-icons/md';
import AuthModal from './AuthModal';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const userInfo = useUserInfo();
  const logoutUser = useLogout();

  const navigate = useNavigate();
  const location = useLocation();
  
  const handleModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <Navbar className={`absolute w-full ${location.pathname === '/' ? "!bg-transparent" : "bg-white/50 backdrop-blur shadow"}`}>
        <Navbar.Brand>
          <img
            src="img/logorectangular.png"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          {userInfo ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={
                <Avatar
                  alt="Ajustes de Usuario"
                  img="https://static.wikia.nocookie.net/succession/images/d/da/Roman_Roy.png"
                  rounded={true}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                <span className="block text-xs font-mono">{`${userInfo.username}`}</span>
                <span className="block truncate text-xs font-mono">
                { `${userInfo.email}`}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={MdDashboardCustomize} onClick={() => navigate("/board")}>
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item icon={MdSettings} onClick={() => navigate("/profile")}>
                Ajustes
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item icon={MdLogout} onClick={() => logoutUser()}>Cerrar sesión</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button gradientDuoTone="purpleToBlue" className="font-semibold" onClick={() => setShowModal(true)}>LOG IN</Button>
          )}
        </div>
      </Navbar>
      <Modal show={showModal} size="md" popup dismissible onClose={() => setShowModal(false)}>
          <AuthModal handleModal={handleModal}/>
      </Modal>
    </>
  );
}

export default Header;
