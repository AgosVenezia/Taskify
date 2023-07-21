import express from 'express';
import { registerUser, deleteUser, authUser, logoutUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route("/")
  .post(registerUser)
  .delete(protect, deleteUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.put("/profile", protect, updateUserProfile);

export default router;
