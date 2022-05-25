import express from "express";
import {
  registerSponsorship,
  getSponsorships,
  getSponsorship,
  updateSponsorship,
  deleteSponsorship,
  getSponsorshipsBySponsor,
} from "../controllers/sponsorships.js";

const router = express.Router();
router.post("/", registerSponsorship);
router.get("/", getSponsorships);
router.get("/:id", getSponsorship);
router.put("/:id", updateSponsorship);
router.delete("/:id", deleteSponsorship);
router.get("/all/:id", getSponsorshipsBySponsor);
export default router;
