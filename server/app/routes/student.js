import express from "express";
import {
  registerStudent,
  getStudents,
  deleteStudent,
  getStudent,
  updateStudent,
} from "../controllers/student.js";

const router = express.Router();
router.post("/", registerStudent);
router.get("/", getStudents);
router.delete("/:id", deleteStudent);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
export default router;
