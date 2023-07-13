import express from 'express';
import { getTasklists, createTasklist, editTasklist, deleteTasklist } from '../controllers/tasklistController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router
  .route('/')
  .get(protect, getTasklists)
  .post(protect, createTasklist);
router
  .route('/:tasklistId')
  .put(protect, editTasklist)
  .delete(protect, deleteTasklist);

export default router;
