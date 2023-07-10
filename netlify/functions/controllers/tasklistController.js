import asyncHandler from "express-async-handler";
import { Tasklist } from "../models/tasklistModel";
import User from "../models/userModel";

// @desc    Crear lista de tareas
// route    POST /api/tasklists
// @access  Private
const createTasklist = asyncHandler(async (req, res) => {
  const { title, pos } = req.body;

  const user = await User.findById(req.user._id);
  const tasklist = new Tasklist({ title, pos });

  try {
    user.tasklists.push(tasklist);
    await user.save();

    res.status(201).json({
      _id: tasklist._id,
      title: tasklist.title,
      pos: tasklist.pos,
      user: user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// @desc    Editar lista de tareas
// route    PUT /api/tasklists/:tasklistId
// @access  Private
const editTasklist = asyncHandler(async (req, res) => {
  const { tasklistId } = req.params;
  const { title, pos } = req.body;

  const user = await User.findById(req.user._id);
  const tasklist = await user.tasklists.id(tasklistId);

  if (tasklist) {
    tasklist.title = title || tasklist.title;
    tasklist.pos = pos || tasklist.pos;
  }

  try {
    await user.save();
    res.status(201).json({
      _id: tasklist._id,
      title: tasklist.title,
      pos: tasklist.pos,
      user: user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// @desc    Eliminar lista de tareas
// route    DELETE /api/tasklists/:tasklistId
// @access  Private
const deleteTasklist = asyncHandler(async(req, res) => {
  const { tasklistId } = req.params;
  const user = await User.findById(req.user._id);

  try {
    const tasklist = user.tasklists.id(tasklistId);
    tasklist.deleteOne();
    await user.save();
    res.status(201).json({
      msg: `Lista ${tasklist.title} eliminada.`
    })
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

export { createTasklist, editTasklist, deleteTasklist };
