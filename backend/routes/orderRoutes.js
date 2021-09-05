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

import { protect, admin } from "../middleware/authMiddleware.js";

// Order Routes //

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/paymentmethod").put(protect, updateOrderPaymentMethod);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
