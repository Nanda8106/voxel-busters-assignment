import express from "express";
import { getIndustryTypes, getStartupData, getStartupFullDetails } from "../controllers/startup.js";

const router = express.Router()

router.get("/type/:industryType/:page/:limit", getStartupData);
router.get("/details/:startupNo", getStartupFullDetails);
router.get("/industry-types", getIndustryTypes);

export default router;