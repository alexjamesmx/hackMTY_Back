import mongoose from "mongoose";
const { Schema } = mongoose;

// Definir el esquema de Usuario
const userSchema = new Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  publicaciones: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  balance: { type: Number, required: true, default: 0 },
});

const companySchema = new Schema({
  name: {type: String},
  categories: [String],
  products: [productSchema]
})

const productSchema = new Schema({
  name: {type: String, required: true},
  price: { type: Number, required: true }
});

const requirementSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  units: {type: Number, default: 1},
  paid: { type: Boolean, default: false },
  paidBy: { type: Schema.Types.ObjectId, ref: "User" }
})

// Definir el esquema de Evento
const eventSchema = new Schema({
  name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  requirements: [requirementSchema],
  equitative: {type: Boolean, required: true}
});

// Crear modelos
export const User = mongoose.model("User", userSchema);
export const Company = mongoose.model("Company", companySchema);
export const Product = mongoose.model("Product", productSchema);
export const Requirement = mongoose.model("Requirement", requirementSchema);
export const Event = mongoose.model("Event", eventSchema);
