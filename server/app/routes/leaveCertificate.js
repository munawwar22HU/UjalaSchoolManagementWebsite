import express from "express";
import {
  getCertificates,
  registerLeaveCertificate,
  getCertificate,
  deleteCertificate,
  updateCertificate,
} from "../controllers/leaveCertificate.js";

const router = express.Router();
router.post("/", registerLeaveCertificate);
router.get("/", getCertificates);
router.get("/:id", getCertificate);
router.delete("/:id", deleteCertificate);
router.put("/:id", updateCertificate);
export default router;
