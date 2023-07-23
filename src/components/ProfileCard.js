import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo, useUserInitials, useDelete } from "../context/userContext";
import { Modal, Avatar, Dropdown, TextInput, Button } from "flowbite-react";
import { MdDangerous } from "react-icons/md";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";

const ConfirmationModal = ({ handleShowModal }) => {
  const [usernameConfirm, setUsernameConfirm] = useState("");
  const userInfo = useUserInfo();
  const deleteUser = useDelete();

  const navigate = useNavigate();

  const closeModal = () => {
    setUsernameConfirm("")
    handleShowModal(false)
  }

  const handleUserDelete = async () => {
    await deleteUser();
    navigate('/');
  }

  return (
    <>
      {/* <Modal.Header /> */}
      <Modal.Body>
        <div className="text-center">
          <MdDangerous className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Eliminar cuenta de{" "}
            <strong>{`${userInfo.username} (${userInfo.firstName} ${userInfo.lastName})`}</strong>
            ? Esta acción no tiene vuelta atrás.
          </h3>
          <div className="mb-4">
            <TextInput
              id="usernameConfirm"
              name="usernameConfirm"
              type="text"
              helperText={
                <>
                  Escriba su nombre de usuario para confirmar la{" "}
                  <strong>eliminación de la cuenta.</strong>
                </>
              }
              required
              value={usernameConfirm}
              onChange={(e) => setUsernameConfirm(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              disabled={usernameConfirm !== userInfo.username}
              onClick={() => handleUserDelete()}
            >
              Sí, seguro
            </Button>
            <Button color="dark" onClick={() => closeModal()}>
              No, cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

const ProfileCard = ({ handleEditMode }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const userInfo = useUserInfo();
  const userInitials = useUserInitials();

  const handleShowModal = (value) => {
    setShowDeleteModal(value)
  } 

  return (
    <>
      <Modal
        show={showDeleteModal}
        size="md"
        popup={false}
        onClose={(e) => setShowDeleteModal(false)}
      >
        <ConfirmationModal handleShowModal={handleShowModal} />
      </Modal>
      
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <button
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleEditMode(true)}
            >
              <FaUserEdit className="mr-2"/>
              Editar perfil
            </button>
          </Dropdown.Item>
          <Dropdown.Item>
            <button
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowDeleteModal(true)}
            >
              <FaUserSlash className="mr-2"/>
              Eliminar usuario
            </button>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        <Avatar
          alt={`Avatar de ${userInfo.username}`}
          className="mb-3 rounded-full shadow-lg text-6xl"
          img={userInfo.avatar?.thumb}
          placeholderInitials={userInitials()}
          size="xl"
          bordered
          rounded
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${userInfo.firstName} ${userInfo.lastName}`}
        </h5>
        <span className="text-md text-gray-500 dark:text-gray-400">
          {userInfo.email}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {userInfo.username}
        </span>
      </div>
    </>
  );
};

export default ProfileCard;
