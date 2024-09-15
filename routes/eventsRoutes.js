import express from "express";
import { Event, User } from "../models/models.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Find the admin user by clerkUserId
    const user = await User.findOne({ clerkUserId: req.body.admin });

    if (!user) {
      return res.status(404).send({ error: "Admin user not found" });
    }

    // Initialize the event object
    const event = new Event({
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      equitative: req.body.equitative,
      products: req.body.products || [],
      admin: user._id,
      total: 0,
      members: req.body.members || [],
    });

    let total = 0;

    for (let j = 0; j < event.products.length; j++) {
      let product = event.products[j];
      total += product.price * product.units;
    }
    event.total = total;
    await event.save();
    console.log("Event created: ", event);
    res.status(201).send(event);
  } catch (error) {
    console.error("Error creating event: ", error);
    res.status(400).send(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by clerkUserId
    const user = await User.findOne({ clerkUserId: userId });

    const events = await Event.find({
      $or: [
        { members: user },
        { admin: user },
        { "requirements.paidBy": user },
      ],
    }).populate("members admin");
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

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
