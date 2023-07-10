import express from 'express';
import { createTask, editTask, deleteTask } from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createTask);
router
  .route('/:taskId')
  .put(protect, editTask)
  .delete(protect, deleteTask);

export default router;
