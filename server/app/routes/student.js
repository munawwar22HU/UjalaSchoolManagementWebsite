import express from "express";
import {
  registerStudent,
  getStudents,
  getActiveStudents,
  deleteStudent,
  getStudent,
  updateStudent,
  getStudentsInClass,
} from "../controllers/student.js";

const router = express.Router();
router.post("/", registerStudent);
router.get("/", getStudents);
router.get("/active", getActiveStudents);
router.delete("/:id", deleteStudent);
router.get("/:id", getStudent);
router.get("/class/:id", getStudentsInClass);
router.put("/:id", updateStudent);
export default router;
