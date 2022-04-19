import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  updatePassword,
} from "../controllers/auth.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/updatePassword", updatePassword);
router.get("/user", protect, getUser);
router.put("/:id", updateUser);

export default router;
