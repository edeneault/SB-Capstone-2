import express from "express";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Updload to Cloudinary Routes //

router.post("/", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ogbieveb",
    });
    console.log(uploadResponse);
    res.json(uploadResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

export default router;
