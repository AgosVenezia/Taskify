import { useState } from "react";
import { useRegister, useLogin } from "../context/userContext";
import { Avatar, Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const SignInForm = ({ handleForm, handleModal }) => {
  const loginUser = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    await loginUser(data);
    handleModal();      
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Inicie sesión
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput id="email" name="email" placeholder="nombre@dominio.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div>
        <TextInput id="password" name="password" type="password" required />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recordarme</Label>
        </div>
        <a
          href="/modal"
          className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
        >
          ¿Olvidó su contraseña?
        </a>
      </div>
      <div className="w-full">
        <Button className="w-full" type="submit">Log in</Button>
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        No tiene cuenta?&nbsp;
        <a
          className="text-cyan-700 hover:underline dark:text-cyan-500 cursor-pointer"
          onClick={handleForm}
        >
          Regístrate
        </a>
      </div>
    </form>
  )
};

const SignUpForm = ({ handleForm, handleModal }) => {
  const registerUser = useRegister();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      await registerUser(data);
      handleModal();      
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Registrate
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="Nombre" />
        </div>
        <TextInput id="firstName" name="firstName" placeholder="Nombre" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Apellido" />
        </div>
        <TextInput id="lastName" name="lastName" placeholder="Apellido" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Nombre de usuario" />
        </div>
        <TextInput id="username" name="username" placeholder="@e23223232" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput id="email" name="email" placeholder="nombre@dominio.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div>
        <TextInput id="password" name="password" type="password" required />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recordarme</Label>
        </div>
        <a
          href="/modal"
          className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
        >
          ¿Olvidó su contraseña?
        </a>
      </div>
      <div className="w-full">
        <Button className="w-full" type="submit">Registrarme</Button>
      </div>
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        ¿Ya tienes cuenta?&nbsp;
        <a
          className="text-cyan-700 hover:underline dark:text-cyan-500 cursor-pointer"
          onClick={handleForm}
        >
          ¡Inicia sesión!
        </a>
      </div>
    </form>
  )
};

export default function AuthForm({ handleModal }) {
  const [isSignIn, setIsSignIn] = useState(true)

  const handleForm = () => {
    setIsSignIn(!isSignIn);
  }

  return (
    <>
      <Modal.Header />
      <Modal.Body>
      <Avatar
        img="img/logorectangular.png"
        size="xl"
        className="mb-6"
        rounded
      />
        { isSignIn
            ? <SignInForm handleForm={handleForm} handleModal={handleModal} />
            : <SignUpForm handleForm={handleForm} handleModal={handleModal} />
        }
      </Modal.Body>
    </>
  );
}
