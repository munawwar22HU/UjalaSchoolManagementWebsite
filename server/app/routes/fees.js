import express from "express";
import {
  registerFees,
  getFees,
  updateFees,
  deleteFees,
  getVouchers,
  getStudentPaidVouchers,
  getStudentUnpaidVouchers,
  generateAll,
} from "../controllers/fees.js";

const router = express.Router();
router.post("/", registerFees);
router.post("/generate-all", generateAll);
router.get("/:id", getFees);
router.put("/:id", updateFees);
router.delete("/:id", deleteFees);
router.get("/", getVouchers);
router.get("/paid/:id", getStudentPaidVouchers);
router.get("/unpaid/:id", getStudentUnpaidVouchers);

export default router;
