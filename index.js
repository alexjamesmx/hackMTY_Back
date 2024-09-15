import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import publicacionRoutes from "./routes/publicacionRoutes.js";
// import transactionRoutes from "./routes/transactionRoutes.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

// Conexión a MongoDB
console.log("Connecting to MongoDB.." + process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Rutas
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(
  "/api/users",
  ClerkExpressWithAuth({}),
  userRouter // Mueve `userRouter` después de `ClerkExpressWithAuth` si quieres proteger las rutas con autenticación
);

app.use("/api//publicaciones", ClerkExpressWithAuth({}), publicacionRoutes);
// app.use(
//   "/transacciones",
//   ClerkExpressWithAuth({}),

//   transactionRoutes
// );

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
