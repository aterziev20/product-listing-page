const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/productModel"); // Import the Product model

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/luamsport");

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
