import express from "express";
const router = express.Router();

import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";

import dotenv from "dotenv";

const stripe = new Stripe(process.env.SECRET_KEY);
dotenv.config();

// Payment Routes //

router.get("/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

router.post("/stripecheckout", async (req, res) => {
  let error;
  let status;
  let email;
  let id;
  let update_time;
  try {
    const { order, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencyKey = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: order.totalPrice * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased by ${order.user.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      },
    );
    status = "success";
    email = token.email;
    id = token.id;
    update_time = Date.now().toString();
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status, email, id, update_time });
});

export default router;
