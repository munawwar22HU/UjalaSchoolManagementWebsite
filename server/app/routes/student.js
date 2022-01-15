import express from "express";
import {
  registerStudent,
  getStudents,
  deleteStudent,
  getStudent,
} from "../controllers/student.js";

const router = express.Router();
router.post("/", registerStudent);
router.get("/", getStudents);
router.delete("/:id", deleteStudent);
router.get("/:id", getStudent);
export default router;
