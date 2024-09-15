import express from "express";
import { Usuario } from "../models/models.js";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await Usuario.find();
    return res.json(users);
  } catch (err) {
    console.log("Error getting users:", err);
    return res.json({ message: err });
  }
});

// LOGIN, CREATE OR RETURN USER
router.post("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const existingUser = await Usuario.findOne({ id });
  if (existingUser) {
    // User already exists
    return res.status(200).json(existingUser);
  }

  const user = new Usuario({
    clerkUserId: req.body.id,
  });

  try {
    const savedUser = await user.save();
    // success
    return res.status(201).json(savedUser);
  } catch (err) {
    console.log("Error saving user:", err);
    return res.status(400).json({ message: err });
  }
});

// GET USER BY ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await Usuario.findById(req.params.userId);
    return res.status(200).json(user);
  } catch (err) {
    console.log("Error getting user by ID:", err);
    return res.status(404).json({ message: err });
  }
});

// UPDATE USERNAME
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { displayName } = req.body;
  try {
    const user = await Usuario.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.displayName = displayName;
    await user.save();

    return res.status(200).json(displayName);
  } catch (err) {
    console.log("Error updating username:", err);
    return res.status(400).json({ message: err.message });
  }
});

export default router;
