/*

import express from "express";
import { Company } from "../models/models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    return res.json(companies);
  } catch (err) {
    console.log("Error getting companies:", err);
    return res.json({ message: err });
  }
});

export default router;

*/