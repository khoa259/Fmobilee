import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
//import Router
import authRoute from "./routes/auth.js";
import routerCategory from "./routes/category.js";
import routerProducts from "./routes/product.js";
<<<<<<< HEAD
import routeImage from "./routes/cloudinary.js";
=======
import routerUpload from "./routes/cloudinary.js";
>>>>>>> a6cedb81b1cc3474034b8120a9acea947fdb3a2c

// variable
const app = express();
// app

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

// connect DB
mongoose
  .connect("mongodb://localhost:27017/Ecommerce-Fmobile")
  .then(() => console.log("Connect DB success"))
  .catch((err) => console.log("DB connect error", err));

//route
app.get("/api", (req, res) => {
  res.json({
    data: "hey you hit node API",
  });
});
// Route middleware
app.use("/api", authRoute);
app.use("/api", routerCategory);
app.use("/api", routerProducts);
<<<<<<< HEAD
app.use("/api", routeImage);
=======
app.use("/api", routerUpload);
>>>>>>> a6cedb81b1cc3474034b8120a9acea947fdb3a2c
// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
