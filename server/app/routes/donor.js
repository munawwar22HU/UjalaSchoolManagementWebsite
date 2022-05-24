import express from "express";
import {
  registerDonor,
  getDonors,
  getDonor,
  updateDonor,
  deleteDonor,
} from "../controllers/donor.js";

const router = express.Router();
router.post("/", registerDonor);
router.get("/", getDonors);
router.get("/:id", getDonor);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);
export default router;
