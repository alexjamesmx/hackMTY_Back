import express from "express";
import { Event, User } from "../models/models.js";
const router = express.Router();

router.put("/:eventId/payment/user/:userId", async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    const { products, amount } = req.body;
    const user = await User.findOne({ clerkUserId: userId});
    const event = await Event.findById(eventId);
    if (!event.equitative) {
      event.products.forEach(product => {
        const id = new mongoose.Types.ObjectId(product._id);
        for (let i = 0; i < products.length; i++){
          if (id == products[i]._id){
            event.products[i].paid = true;
            event.products[i].paidBy = user._id;;
          }
        }
      });
    }
    event.members.forEach(member => {
      if (member.user.toString() === user._id.toString()) {
        member.paid = amount;
      }
    });
    await event.save();
    res.status(201).send(event);

  } catch (error){
    console.error("Error updating: ", error);
    res.status(400).send(error);
  }
})


router.post("/", async (req, res) => {
  try {
    // Find the admin user by clerkUserId
    const user = await User.findOne({ clerkUserId: req.body.admin });
    
    if (!user) {
      return res.status(404).send({ error: "Admin user not found" });
    }

    const membersPromises = req.body.members.map(async (clerkUserId) => {
      const user = await User.findOne({ clerkUserId });
      if (!user) {
        throw new Error(`User not found for clerkUserId: ${clerkUserId}`);
      }
      return { user: user._id, paid: 0 };
    });

    const members = await Promise.all(membersPromises);

    // Initialize the event object
    const event = new Event({
      name: req.body.name,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      equitative: req.body.equitative,
      products: req.body.products || [],
      admin: user._id,
      total: 0,
      members: members || [],
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
    console.log("user", user);
    const events = await Event.find({
      "members": {
        $elemMatch: {
          "user": user._id
        }
      }
    }).populate("members admin");
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
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
    const events = await Event.find().populate("admin").populate("members.user");

    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
