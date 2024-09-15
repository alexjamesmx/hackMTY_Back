import express from "express";
import { Product } from "../models/models.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate('company');
    return res.json(products);
  } catch (err) {
    console.log("Error getting products:", err);
    return res.json({ message: err });
  }
});

router.get("/company/:companyId", async (req, res) => {
    try {
      const { companyId } = req.params;
      const products = await Product.find({ company: companyId }).populate('company');
      return res.json(products);
    } catch (err) {
      console.log("Error getting products by company ID:", err);
      return res.status(500).json({ message: "Error getting products by company ID", error: err.message });
    }
  });

export default router;