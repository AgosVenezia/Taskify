import asyncHandler from "express-async-handler";
import { Tasklist } from "../models/tasklistModel";

// @desc    Obtener todas las listas de tareas del usuario
// route    GET /api/tasklists
// @access  Private
const getTasklists = asyncHandler(async (req, res) => {
  try {
    const tasklists = await Tasklist.find({ userId: req.user._id });
    res.status(200).json(tasklists);
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` })    
  }
})

// @desc    Crear lista de tareas
// route    POST /api/tasklists
// @access  Private
const createTasklist = asyncHandler(async (req, res) => {
  const { title, pos } = req.body;
  const userId = req.user._id;

  try {
    const tasklist = await Tasklist.create({
      title,
      pos,
      userId
    });

    res.status(201).json({
      _id: tasklist._id,
      title: tasklist.title,
      pos: tasklist.pos,
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

  try {
    const tasklist = await Tasklist.findByIdAndUpdate(tasklistId, {
      title,
      pos
    });
    res.status(200).json({
      _id: tasklist._id,
      title: tasklist.title,
      pos: tasklist.pos,
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

  try {
    const tasklist = await Tasklist.findByIdAndDelete(tasklistId);
    res.status(200).json({
      msg: `Lista ${tasklist.title} eliminada.`
    })
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

export { getTasklists, createTasklist, editTasklist, deleteTasklist };
