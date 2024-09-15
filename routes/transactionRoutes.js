const express = require("express");
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
const router = express.Router();

// Route to pay a part
router.post("/pagar", async (req, res) => {
  // Implement payment logic here
  res.send("Payment logic not implemented yet");
});

// Route to deposit
router.post("/depositar", async (req, res) => {
  // Implement deposit logic here
  res.send("Deposit logic not implemented yet");
});

// Route to withdraw
router.post("/retirar", async (req, res) => {
  // Implement withdrawal logic here
  res.send("Withdrawal logic not implemented yet");
});

module.exports = router;
