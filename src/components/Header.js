import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserInfo, useUserInitials, useLogout } from '../context/userContext';
import {
  Navbar,
  Dropdown,
  Avatar,
  Button,
  Modal,
} from "flowbite-react";
import { MdDarkMode, MdLightMode, MdComputer, MdDashboardCustomize, MdSettings, MdLogout } from 'react-icons/md';
import AuthModal from './AuthModal';

const ThemeSelectDropdown = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const labelIcon = () => {
    const classes =
      "text-2xl my-2 text-gray-700 dark:text-gray-200 hover:text-gray-600 active:scale-110 transition-transform";

    if (theme === "dark") {
      return <MdDarkMode className={classes} />;
    }

    if (theme === "light") {
      return <MdLightMode className={classes} />;
    }

    if (theme === null) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? (
        <MdDarkMode className={classes} />
      ) : (
        <MdLightMode className={classes} />
      );
    }
  };

  return (
    <Dropdown
      className="font-semibold text-gray-700 dark:text-gray-200"
      arrowIcon={false}
      size="lg"
      inline
      label={labelIcon()}
    >
      <Dropdown.Item icon={MdLightMode} onClick={() => setTheme('light')} >Claro</Dropdown.Item>
      <Dropdown.Item icon={MdDarkMode} onClick={() => setTheme('dark')} >Oscuro</Dropdown.Item>
      <Dropdown.Item icon={MdComputer} onClick={() => setTheme(null)} >Sistema</Dropdown.Item>
    </Dropdown>
  );
};

function Header() {
  const [showModal, setShowModal] = useState(false);

  const userInfo = useUserInfo();
  const userInitials = useUserInitials();
  const logoutUser = useLogout();

  const navigate = useNavigate();
  const location = useLocation();
  
  const handleModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <Navbar className={`fixed w-full !z-50 ${location.pathname === '/' ? "!bg-transparent" : "bg-white/50 dark:bg-gray-700/50 backdrop-blur shadow"}`}>
        <Navbar.Brand>
          <img
            src="img/logorectangular.png"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
        </Navbar.Brand>
        <div className="flex gap-6 md:order-2">
          {userInfo ? (
            <>
              {/* Dropdown selector de tema */}
              <ThemeSelectDropdown />

              {/* Dropdown menú de usuario */}
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                  alt="Ajustes de Usuario"
                  img={userInfo.avatar?.thumb}
                  placeholderInitials={userInitials()}
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
            </>
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
