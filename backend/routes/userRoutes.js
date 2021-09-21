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

// Authorazation Middleware //
import { ensureLoggedIn, ensureAdmin } from "../middleware/authMiddleware.js";

// User Routes //

router.route("/").post(registerUser).get(ensureLoggedIn, ensureAdmin, getUsers);

router.post("/login", authUser);
router.get("/logout", logoutUser);
router
  .route("/profile")
  .get(ensureLoggedIn, getUserProfile)
  .put(ensureLoggedIn, updateUserProfile);

router
  .route("/:id")
  .delete(ensureLoggedIn, ensureAdmin, deleteUser)
  .get(ensureLoggedIn, ensureAdmin, getUserById)
  .put(ensureLoggedIn, ensureAdmin, updateUser);

export default router;
