import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  logoutUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// @desc  Fetch all products
// @route GET /api/products
// @access Public

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/login", authUser);
router.get("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
