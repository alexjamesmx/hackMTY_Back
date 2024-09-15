import express from "express";
import { User } from "../models/models.js";
const router = express.Router();

router.post("/loan/", async (req, res) => {
  const { idUser, amount_requested } = req.body;

  try {
    const user = await User.findOne({ clerkUserId: idUser });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.balance += amount_requested;
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send(error);
  }
});

export default router;
