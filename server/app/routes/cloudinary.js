import express from "express";
import {
  getCloudinaryURL,
  getCloudinaryUploadPreset,
} from "../controllers/cloudinary.js";

const router = express.Router();
router.get("/url", getCloudinaryURL);
router.get("/preset", getCloudinaryUploadPreset);
export default router;
