import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import color from "colors";
// Router
import productRouter from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("API is running... ");
});

app.use("/api/products", productRouter);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
