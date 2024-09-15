import express from "express";
import { Event } from "../models/models.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({
      $or: [
        { members: userId },
        { admin: userId },
        { "requirements.paidBy": userId }
      ]
    }).populate('members admin');
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { eventId } = req.params;
    const events = await Event.findById(eventId);
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
