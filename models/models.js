import mongoose from "mongoose";
const { Schema } = mongoose;

// Definir el esquema de Usuario
const usuarioSchema = new Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  publicaciones: [{ type: Schema.Types.ObjectId, ref: "Evento" }],
  balance: { type: Number, required: true },
});

const empresaSchema = new Schema({
  name: {type: String},
  categories: [String],
  products: [productoSchema]
})

const productoSchema = new Schema({
  name: {type: String, required: true},
  price: { type: Number, required: true }
});

const requirementSchema = new Schema({
  producto: { type: Schema.Types.ObjectId, ref: "Producto" },
  unidades: {type: Number, default: 1},
  pagado: { type: Boolean, default: false },
  pagadoPor: { type: Schema.Types.ObjectId, ref: "Usuario" }
})

// Definir el esquema de Evento
const eventoSchema = new Schema({
  nombre: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  requerimientos: [requirementSchema],
  pagoEquitativo: {type: Boolean, required: true}
});

// Crear modelos
export const Usuario = mongoose.model("Usuario", usuarioSchema);
export const Empresa = mongoose.model("Empresa", empresaSchema);
export const Producto = mongoose.model("Producto", productoSchema);
export const Requerimiento = mongoose.model("Requerimiento", productoSchema);
export const Evento = mongoose.model("Evento", eventoSchema);
