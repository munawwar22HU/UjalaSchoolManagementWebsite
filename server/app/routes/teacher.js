import express from "express";
import {
  registerTeacher,
  getTeachers,
  deleteTeacher,
  getTeacher,
  updateTeacher,
} from "../controllers/teacher.js";

const router = express.Router();
router.post("/", registerTeacher);
router.get("/", getTeachers);
router.delete("/:id", deleteTeacher);
router.get("/:id", getTeacher);
router.put("/:id", updateTeacher);
export default router;
