import { useState } from "react";
import { useUserInfo, useUpdate } from "../context/userContext";
import { Avatar, Button, Label, TextInput, FileInput } from "flowbite-react";
import { MdSave, MdOutlineBackspace } from "react-icons/md";

const ProfileForm = ({ handleEditMode }) => {
  const userInfo = useUserInfo();
  const [formInfo, setFormInfo] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email,
    password: "",
    passwordConfirm: "",
  })

  const updateUser = useUpdate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormInfo(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = formInfo;
    if(password !== passwordConfirm) {
      alert("Las contraseñas no coinciden.")
    } else {
      await updateUser(formInfo);
      handleEditMode(false)
    }
  }

  return (
    <form
      className="flex max-w-md flex-col gap-4"
      onSubmit={(e) => handleSubmit(e)}
      onReset={() => handleEditMode(false)}
    >
      <Avatar
        alt={`Avatar de ${userInfo.username}`}
        img="https://static.wikia.nocookie.net/succession/images/d/da/Roman_Roy.png"
        size="xl"
        bordered
        rounded
      />
      <div className="max-w-md" id="fileUpload">
        <div className="mb-2 block">
          <Label
            htmlFor="file"
            value="Cargar imagen"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <FileInput id="file" />
      </div>

      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="firstName"
            value="Nombre"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput
          id="firstName"
          name="firstName"
          placeholder="Nombre"
          required
          type="text"
          sizing="sm"
          value={formInfo.firstName}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="lastName"
            value="Apellido"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput
          id="lastName"
          name="lastName"
          placeholder="Apellido"
          required
          type="text"
          sizing="sm"
          value={formInfo.lastName}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email"
            value="Email"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput
          id="email"
          name="email"
          placeholder="name@flowbite.com"
          required
          type="email"
          sizing="sm"
          value={formInfo.email}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="username"
            value="Nombre de usuario"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput
          id="username"
          name="username"
          placeholder="nombredeusuario"
          required
          type="text"
          sizing="sm"
          value={formInfo.username}
          onChange={handleFormChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password"
            value="Contraseña"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput id="password" name="password" type="password" sizing="sm" onChange={handleFormChange} />
      </div>

      <div className="mb-3">
        <div className="mb-2 block">
          <Label
            htmlFor="passwordConfirm"
            value="Confirmar Contraseña"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput id="passwordConfirm" name="passwordConfirm" type="password" sizing="sm" onChange={handleFormChange} />
      </div>
        
      <Button.Group>
        <Button
          type="reset"
          color="failure"
          className="grow text-xs font-semibold uppercase"
        >
          <MdOutlineBackspace className="mr-2" />
          Cancelar
        </Button>
        <Button
          type="submit"
          color="success"
          className="grow text-xs font-semibold uppercase"
        >
          <MdSave className="mr-2" />
          Guardar
        </Button>
      </Button.Group>
    </form>
  );
};

export default ProfileForm;
