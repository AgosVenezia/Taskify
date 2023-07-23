import { useState, useEffect } from "react";
import { useUserInfo, useUserInitials, useUpdate } from "../context/userContext";
import { toast } from 'react-toastify';
import { Avatar, Button, Label, TextInput, FileInput } from "flowbite-react";
import { MdSave, MdOutlineBackspace } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";

const ProfileForm = ({ handleEditMode }) => {
  const userInfo = useUserInfo();
  const userInitials = useUserInitials();
  const updateUser = useUpdate();

  const [imgPreview, setImgPreview] = useState(userInfo.avatar?.thumb || "")
  const [formInfo, setFormInfo] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email,
    avatar: undefined,
    password: "",
    passwordConfirm: "",
  })
  
  useEffect(() => {
    if(formInfo.avatar) {
      const imgUrl =  URL.createObjectURL(formInfo.avatar)
      setImgPreview(imgUrl)
    } else if (formInfo.avatar === false) {
      setImgPreview("")
    } 
  }, [formInfo.avatar])

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormInfo(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }
  
  const handleFileSelection = (e) => {
    setFormInfo(prevForm => ({
      ...prevForm,
      avatar: e.target.files ? e.target.files[0] : false
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = formInfo;

    if(password !== passwordConfirm) {
      toast.error("Las contraseñas no coinciden.")
      return
    }
    
    const updatedUser = await updateUser(formInfo);

    if(updatedUser) handleEditMode(false)
  }
  
  return (
    <form
      className="flex max-w-md flex-col gap-4"
      encType="multipart/form-data"
      onSubmit={(e) => handleSubmit(e)}
      onReset={() => handleEditMode(false)}
    >
      <Avatar
        alt={`Avatar de ${userInfo.username}`}
        className="text-6xl relative w-fit mx-auto"
        img={imgPreview}
        placeholderInitials={userInitials()}
        size="xl"
        bordered
        rounded
      >
        <RiCloseCircleFill className="absolute top-0 right-0 text-3xl text-red-600 cursor-pointer" onClick={handleFileSelection} />
      </Avatar>
      <div className="max-w-md" id="fileUpload">
        <div className="mb-2 block">
          <Label
            htmlFor="avatar"
            value="Cargar imagen"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <FileInput id="avatar" name="avatar" onChange={handleFileSelection}/>
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
        <TextInput id="password" name="password" type="password" onChange={handleFormChange} />
      </div>

      <div className="mb-3">
        <div className="mb-2 block">
          <Label
            htmlFor="passwordConfirm"
            value="Confirmar Contraseña"
            className="text-xs text-zinc-600 uppercase font-semibold"
          />
        </div>
        <TextInput id="passwordConfirm" name="passwordConfirm" type="password" onChange={handleFormChange} />
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
