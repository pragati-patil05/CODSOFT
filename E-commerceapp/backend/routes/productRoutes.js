const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
// Add sample products (temporary)

 router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});   // 🔥 delete old products

    const products = [
      { name: "Laptop", price: 55000 },
      { name: "Wireless Headphones", price: 2499 },
      { name: "Smart Watch", price: 3999 },
      { name: "Running Shoes", price: 2999 },
      { name: "Backpack", price: 1299 },
      { name: "Bluetooth Speaker", price: 1799 },
      { name: "Gaming Mouse", price: 999 },
      { name: "Keyboard", price: 1499 },
      { name: "Power Bank", price: 1199 },
      { name: "Sunglasses", price: 899 },
      { name: "T-Shirt", price: 699 },
      { name: "Jeans", price: 1999 }
    ];

    await Product.insertMany(products);

    res.json({ message: "Products Seeded Successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error seeding products" });
  }
});
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
