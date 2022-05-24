import express from "express";
import {
  registerDonation,
  getDonations,
  getDonation,
  updateDonation,
  deleteDonation,
  getDonationsByDonor,
} from "../controllers/donation.js";

const router = express.Router();
router.post("/", registerDonation);
router.get("/", getDonations);
router.get("/:id", getDonation);
router.put("/:id", updateDonation);
router.delete("/:id", deleteDonation);
router.get("/all/:id", getDonationsByDonor);
export default router;
