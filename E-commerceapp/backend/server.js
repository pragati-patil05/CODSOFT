const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("Email user:", process.env.EMAIL_USER);
console.log("Email pass:", process.env.EMAIL_PASS);

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", orderRoutes);

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("E-commerce Backend is Running 🚀");
});

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Connection Error ❌", err));

// 🔹 Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
