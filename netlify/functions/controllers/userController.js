import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import uploadAvatar from '../utils/uploadAvatar.js';
import User from '../models/userModel.js';
import { Tasklist } from '../models/tasklistModel.js';

// @desc   Registrar usuario / Generar token
// route   POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  const userExists = await User.findOne({ email }) || await User.findOne({ username })

  if(userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  };

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password
  })

  if(user) {
    generateToken(res, user._id);
    res.status(201).json({
      msg: "Usuario creado exitosamente",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      }
    })
  }

});

// @desc    Eliminar usuario
// route    DELETE /api/users
// @access  Private
const deleteUser = asyncHandler(async(req, res) => {
  try {
    const deletedTasklists = await Tasklist.deleteMany({ userId: req.user._id })
    const deletedUser = await User.findByIdAndDelete(req.user._id);

    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
    });
    
    res.status(200).json({
      msg: `Usuario ${deletedUser.username} eliminado. ${deletedTasklists?.deletedCount} listas eliminadas`
    })
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// @desc    Autenticar y generar token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      msg: "Sesión iniciada exitosamente",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }
    });
  } else {
    res.status(401);
    throw new Error('Credenciales incorrectas');
  };
});

// @desc    Cerrar sesión de usuario
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({ msg: 'Sesión cerrada' })
})

// @desc   Editar información de usuario
// route   PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if(req.body.password) {
      user.password = req.body.password;
    }

    if(req.files) {
      const uploadedAvatar = await uploadAvatar(req.files.avatar)
  
      user.avatar = {
        img: uploadedAvatar.data.image.url,
        thumb: uploadedAvatar.data.thumb.url,
        delete_url: uploadedAvatar.data.delete_url
      }
    } else if(req.body.avatar === 'false') {
      user.avatar = {}
    }

    const updatedUser = await user.save();

    res.status(200).json({
      msg: 'Perfil de usuario actualizado',
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar
      }
    })
  } else {
    res.status(404);
    throw new Error('El usuario no existe.');
  }
});

export {
  registerUser,
  deleteUser,
  authUser,
  logoutUser,
  updateUserProfile
}
