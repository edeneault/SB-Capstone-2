import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const ensureLoggedIn = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(403);
  }
  try {
    // token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized token failed");
  }
});

const ensureAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as Admin");
  }
};

export { ensureLoggedIn, ensureAdmin };
