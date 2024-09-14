const express = require('express');
const { Usuario } = require('../models/models');
const router = express.Router();

router.post('/crear', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).send(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/obtener/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send();
    }
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

// Route to obtain all users
router.get('/obtener', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(error);
  }
});
