import express from "express";
import { User } from "../models/models.js";

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log("Error getting users:", err);
    return res.json({ message: err });
  }
});

// LOGIN, CREATE OR RETURN USER
router.post("/", async (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const existingUser = await User.findOne({ clerkUserId: id });
  if (existingUser) {
    // User already exists
    return res.status(200).json(existingUser);
  }

  let name = email
  if (firstName && lastName){
    name = firstName + " " + lastName
  }

  const user = new User({
    clerkUserId: req.body.id,
    name
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
    const user = await User.findById(req.params.userId);
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
    const user = await User.findById(userId);
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
