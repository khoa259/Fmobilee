const express = require("express");
const products = require("./data/product");

const app = express();
app.get("/", (req, res) => {
  res.send("API is running... ");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((item) => item._id === req.params.id);
  res.json(product);
});
app.listen(8000, console.log("Server running port 8000"));
