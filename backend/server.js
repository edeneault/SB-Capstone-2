import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";

import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

const stripe = new Stripe(process.env.SECRET_KEY);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware //
app.use(cookieParser());

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

app.post("/api/stripecheckout", async (req, res) => {
  // console.log("Request:", req.body);

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
    console.log("Charge:", { charge });
    status = "success";
    email = token.email;
    id = token.id;
    update_time = Date.now().toString();
    // console.log("UPDTIME", update_time);
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status, email, id, update_time });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
