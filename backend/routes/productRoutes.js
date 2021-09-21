import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  getTopProducts,
  getProductsByCategory,
  getProductsByBrand,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from "../controllers/productController.js";

// Authorization Middleware //

import { ensureLoggedIn, ensureAdmin } from "../middleware/authMiddleware.js";

// Product Routes //

router
  .route("/")
  .get(getProducts)
  .post(ensureLoggedIn, ensureAdmin, createProduct);
router.route("/:id/reviews").post(ensureLoggedIn, createProductReview);
router.get("/top", getTopProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/brand/:brand", getProductsByBrand);
router
  .route("/:id")
  .get(getProductById)
  .delete(ensureLoggedIn, ensureAdmin, deleteProduct)
  .put(ensureLoggedIn, ensureAdmin, updateProduct);

export default router;
