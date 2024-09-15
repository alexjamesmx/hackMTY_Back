import express from "express";
import { Event } from "../models/models.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let total = 0;
    const event = new Event(req.body);
    for (let j = 0; j < event.products.length; j++){
      let product = event.products[j];
      total += product.price * product.units;
    }
    event.total = total;
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({
      "members": {
        $elemMatch: {
          "user": userId
        }
      }
    });
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
