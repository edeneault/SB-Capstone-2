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

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/brand/:brand", getProductsByBrand);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
