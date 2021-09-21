import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
  updateOrderPaymentMethod,
} from "../controllers/orderController.js";

// Authorization Middleware //

import { ensureLoggedIn, ensureAdmin } from "../middleware/authMiddleware.js";

// Order Routes //

router
  .route("/")
  .post(ensureLoggedIn, addOrderItems)
  .get(ensureLoggedIn, ensureAdmin, getOrders);
router.route("/myorders").get(ensureLoggedIn, getMyOrders);
router.route("/:id").get(ensureLoggedIn, getOrderById);
router.route("/:id/pay").put(ensureLoggedIn, updateOrderToPaid);
router
  .route("/:id/paymentmethod")
  .put(ensureLoggedIn, updateOrderPaymentMethod);
router
  .route("/:id/deliver")
  .put(ensureLoggedIn, ensureAdmin, updateOrderToDelivered);

export default router;
