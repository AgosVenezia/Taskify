import asyncHandler from 'express-async-handler';
import { Task } from '../models/taskModel';
import { Tasklist } from '../models/tasklistModel';
import User from '../models/userModel';

// @desc    Crear nueva tarea
// route    POST /api/tasks/
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { tasklistId, title, description, pos, label } = req.body;

  const user = await User.findById(req.user._id);
  const tasklist = user.tasklists.id(tasklistId);

  const task = new Task({
    title,
    description,
    pos,
    label
  })
  
  try {
    tasklist.tasks.push(task);
    await user.save();

    res.status(201).json({
      _id: task._id,
      title: task.title,
      description: task.description,
      pos: task.pos,
      label: task.label,
      tasklistId: tasklistId,
      user: user.username,
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
  const { tasklistId, title, description, pos, label } = req.body;

  const user = await User.findById(req.user._id);
  const task = user.tasklists.id(tasklistId).tasks.id(taskId);
  // console.log('editTask task -> ', task);

  if (task && (task.ownerDocument() === user)) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.pos = pos || task.pos;
    task.label = label || task.label;
  }

  try {
    await user.save();
    res.status(201).json({
      _id: task._id,
      title: task.title,
      description: task.description,
      pos: task.pos,
      label: task.label,
      tasklistId: tasklistId,
      user: user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

// @desc    Eliminar tarea
// route    DELETE /api/tasks/:taskId
// @access  Private
const deleteTask = asyncHandler(async(req, res) => {
  const { taskId } = req.params;
  const { tasklistId } = req.body;

  const user = await User.findById(req.user._id);
  const tasklist = user.tasklists.id(tasklistId);

  try {
    const task = tasklist.tasks.id(taskId);
    task.deleteOne();
    await user.save();
    res.status(201).json({
      msg: `Tarea ${task.title} eliminada.`
    })
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}` });
  }
});

export { createTask, editTask, deleteTask };
