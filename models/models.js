import mongoose from "mongoose";
const { Schema } = mongoose;

// Definir el esquema de Usuario
const usuarioSchema = new Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  publicaciones: {
    type: [{ type: Schema.Types.ObjectId, ref: "Publicacion" }],
    default: [], // Default value for publicaciones
  },
  balance: { type: Number, required: true, default: 0 },
});

// Definir el esquema de Publicacion
const publicacionSchema = new Schema({
  id: { type: String, required: true },
  nombre_evento: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  miembros: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
});

// Definir el esquema de Evento
const eventoSchema = new Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  usuarios: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
});

// Crear modelos
export const Usuario = mongoose.model("Usuario", usuarioSchema);
export const Publicacion = mongoose.model("Publicacion", publicacionSchema);
export const Evento = mongoose.model("Evento", eventoSchema);
