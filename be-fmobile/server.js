import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import color from "colors";
import { notFound, erroHandler } from "./middleware/errorMiddleware.js";
// Router
import productRouter from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

app.get("/", (req, res) => {
  res.send("API is running... ");
});

app.use("/api/products", productRouter);

app.use(notFound)

app.use(erroHandler)


const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
