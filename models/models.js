import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  clerkUserId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String, required: true},
  publicaciones: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  balance: { type: Number, required: true, default: 0 },
});

/*
const companySchema = new Schema({
  name: {type: String},
  category: {type: String, required: true},
})

const productSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true },
  company: {type: Schema.Types.ObjectId, ref: "Company" }
});
*/

const eventSchema = new Schema({
  name: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  products: [{
    name: {type: String, required: true },
    units: { type: Number, default: 1},
    price: {type: Number, required: true},
    paid: { type: Boolean, default: false },
    paidBy: { type: Schema.Types.ObjectId, ref: "User" }
  }],
  equitative: {type: Boolean, required: true},
  admin: {type: Schema.Types.ObjectId, ref: "User", required: true},
  members: [{
    user: {type: Schema.Types.ObjectId, ref: "User"},
    paid: { type: Number, default: 0 }
  }],
  total: {type: Number, default: 0}
});

// Crear modelos
export const User = mongoose.model("User", userSchema);
//export const Company = mongoose.model("Company", companySchema);
// export const Product = mongoose.model("Product", productSchema);
export const Event = mongoose.model("Event", eventSchema);
