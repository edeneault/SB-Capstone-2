import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// Desc:   Create new order     //
// Route:  POST /api/orders     //
// Auth: ensureLoggedIn         //
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// Desc:   Get order by ID      //
// Route:  GET /api/orders/:id  //
// Auth: ensureLoggedIn         //
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Desc:   Update order by ID to Paid  //
// Route:  PUT /api/orders/:id/pay     //
// Auth: ensureLoggedIn                //
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentMethod === "Paypal"
      ? (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: Date.now(),
          email_address: req.body.payer.email_address,
        })
      : (order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: Date.now(),
          email_address: req.body.email_address,
        });
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Desc:   Update order by ID to new payment method //
// Route:  PUT /api/orders/:id/paymentmethod        //
// Auth: ensureLoggedIn                             //
const updateOrderPaymentMethod = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const paymentMethod = req.body.paymentMethod;

  if (order) {
    order.paymentMethod = paymentMethod;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Desc:   Update order to delivered      //
// Route:  PUT /api/orders/:id/deliver    //
// Auth: ensureAdmin                      //
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// Desc:   Get logged in user orders  //
// Route:  GET /api/orders/myorders   //
// Auth: ensureLoggedIn               //
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// Desc:   Get all orders    //
// Route:  GET /api/orders   //
// Auth: ensureLoggedIn      //
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderPaymentMethod,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
