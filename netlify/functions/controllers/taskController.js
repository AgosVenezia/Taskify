import asyncHandler from 'express-async-handler';
import { Task } from '../models/taskModel';
import { Tasklist } from '../models/tasklistModel';
import User from '../models/userModel';

// @desc    Crear nueva tarea
// route    POST /api/tasks/
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { tasklistId, title, description, label } = req.body;

  const tasklist = await Tasklist.findById(tasklistId);

  const task = new Task({
    userId: req.user._id,
    title,
    description,
    label
  })
  
  try {
    tasklist.tasks.push(task);
    await tasklist.save();

    res.status(201).json({
      _id: task._id,
      title: task.title,
      description: task.description,
      pos: task.pos,
      label: task.label,
      tasklistId: tasklistId,
      user: req.user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// @desc    Editar tarea
// route    PUT /api/tasks/:taskId
// @access  Private
const editTask = asyncHandler(async(req, res) => {
  const { taskId } = req.params;
  const { title, description, pos, label, tasklistId } = req.body;

  try {
    const tasklist = await Tasklist.findById(tasklistId);
    const task = tasklist.tasks.id(taskId);
    
    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.pos = pos || task.pos;
      task.label = label || task.label;
    }

    tasklist.save();

    res.status(201).json({
      _id: task._id,
      title: task.title,
      description: task.description,
      pos: task.pos,
      label: task.label,
      tasklistId: tasklistId,
      user: req.user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// @desc    Eliminar tarea
// route    DELETE /api/tasks/:tasklistId.:taskId
// @access  Private
const deleteTask = asyncHandler(async(req, res) => {
  const { tasklistId, taskId } = req.params;

  try {
    const tasklist = await Tasklist.findById(tasklistId)
    const task = tasklist.tasks.id(taskId)
    task.deleteOne();

    await tasklist.save();

    res.status(201).json({
      msg: `Tarea ${task.title} eliminada.`
    })
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

export { createTask, editTask, deleteTask };
