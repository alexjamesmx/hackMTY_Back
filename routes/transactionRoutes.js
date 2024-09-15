import express from "express";

const router = express.Router();

router.post("/products", async (req, res) => {
  res.send("Payment logic not implemented yet");
});

// equitative
router.post("/deposit", async (req, res) => {
  res.send("Deposit logic not implemented yet");
});

export default router;
