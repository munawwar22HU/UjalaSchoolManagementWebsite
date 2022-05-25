import express from "express";
import {
  registerSponsor,
  getSponsors,
  getSponsor,
  updateSponsor,
  deleteSponsor,
} from "../controllers/sponsor.js";
const router = express.Router();
router.post("/", registerSponsor);
router.get("/", getSponsors);
router.get("/:id", getSponsor);
router.put("/:id", updateSponsor);
router.delete("/:id", deleteSponsor);
export default router;
