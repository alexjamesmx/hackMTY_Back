import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventsRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

// import productRouter from "./routes/productRoutes.js";
// import companyRouter from "./routes/companyRoutes.js";
//import { generateDummyData } from "./dump.js";
// import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Conexión a MongoDB
console.log("Connecting to MongoDB.." + process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    /*
    try {
      const { companies, products } = await generateDummyData(10, 50);
      console.log(`Dummy data generated: ${companies.length} companies and ${products.length} products`);
    } catch (error) {
      console.error("Error generating dummy data:", error);
    }
    */
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Rutas
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.delete("/", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).deleteMany({});
    }
    res.status(200).json({ message: "All documents deleted successfully" });
  } catch (error) {
    console.error("Error deleting documents:", error);
    res.status(500).json({ error: "Failed to delete documents" });
  }
});

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/transactions", transactionRouter);

// app.use("/api/products", productRouter);
// app.use("/api/companies", companyRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
