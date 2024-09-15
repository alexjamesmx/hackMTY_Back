import express from "express";

const router = express.Router();

router.post("/pay/product", async (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  res.send("Payment logic not implemented yet");
});

router.post("/depositar", async (req, res) => {
  res.send("Deposit logic not implemented yet");
});

router.post("/retirar", async (req, res) => {
  res.send("Withdrawal logic not implemented yet");
});

module.exports = router;
