const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Usuario schema
const usuarioSchema = new Schema({
  id: { type: String, required: true },
  publicaciones: [{ type: Schema.Types.ObjectId, ref: 'Publicacion' }],
  balance: { type: Number, required: true }
});

// Define the Publicacion schema
const publicacionSchema = new Schema({
  id: { type: String, required: true },
  nombre_evento: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  miembros: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

// Define the Evento schema
const eventoSchema = new Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
});

// Create models
const Usuario = mongoose.model('Usuario', usuarioSchema);
const Publicacion = mongoose.model('Publicacion', publicacionSchema);
const Evento = mongoose.model('Evento', eventoSchema);

module.exports = { Usuario, Publicacion, Evento };