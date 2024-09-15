import express from "express";

const router = express.Router();

router.post("/pagar", async (req, res) => {
  res.send("Payment logic not implemented yet");
});

router.post("/depositar", async (req, res) => {
  res.send("Deposit logic not implemented yet");
});

router.post("/retirar", async (req, res) => {
  res.send("Withdrawal logic not implemented yet");
});

module.exports = router;
