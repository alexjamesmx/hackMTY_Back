import express from "express";
import { Publicacion } from "../models/models.js";
const router = express.Router();

router.post("/crear", async (req, res) => {
  try {
    const publicacion = new Publicacion(req.body);
    await publicacion.save();
    res.status(201).send(publicacion);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/obtener", async (req, res) => {
  try {
    const publicaciones = await Publicacion.find();
    res.status(200).send(publicaciones);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
