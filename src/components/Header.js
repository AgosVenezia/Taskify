import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserInfo, useLogout } from '../context/userContext';
import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
} from "flowbite-react";
import AuthModal from './AuthModal';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const userInfo = useUserInfo();
  const logoutUser = useLogout();

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
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Ajustes</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => logoutUser()}>Cerrar sesión</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button gradientDuoTone="purpleToBlue" className="font-semibold" onClick={() => setShowModal(true)}>LOG IN</Button>
          )}

          {/* <Navbar.Toggle /> */}
        </div>
        {/* <Navbar.Collapse>
          <Navbar.Link href="/navbars" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">About</Navbar.Link>
          <Navbar.Link href="/navbars">Services</Navbar.Link>
          <Navbar.Link href="/navbars">Pricing</Navbar.Link>
          <Navbar.Link href="/navbars">Contact</Navbar.Link>
        </Navbar.Collapse> */}
      </Navbar>
      <Modal show={showModal} size="md" popup dismissible onClose={() => setShowModal(false)}>
          <AuthModal handleModal={handleModal}/>
      </Modal>
    </>
  );
}

export default Header;
