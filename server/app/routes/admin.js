import express from "express";
import { createUser, getUsers, deleteUser,getUser,updateUser } from "../controllers/admin.js";
const router = express.Router();
router.post("/create", createUser);
router.get("/all/:id", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
export default router;
