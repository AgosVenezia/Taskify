import express from 'express';
import { createTasklist, editTasklist, deleteTasklist } from '../controllers/tasklistController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createTasklist);
router
  .route('/:tasklistId')
  .put(protect, editTasklist)
  .delete(protect, deleteTasklist);

export default router;
