const express = require("express");
const mongoose = require("mongoose");
const usuarioRoutes = require("./routes/usuarioRoutes");
const publicacionRoutes = require("./routes/publicacionRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/event_management')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

// Use routes
app.use("/usuarios", usuarioRoutes);
app.use("/publicaciones", publicacionRoutes);
app.use("/transacciones", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});