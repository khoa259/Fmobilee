import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();
//import Router
import authRoute from "./routes/auth.js";
import routerCategory from "./routes/category.js";
import routerProducts from "./routes/product.js";
import routerUpload from "./routes/cloudinary.js";
import routerCart from "./routes/user.js";
import routerPayment from "./routes/stripe.js";
import routerStatus from "./routes/status/Status.js";
import routerBill from "./routes/Bill/Bill.js";
import order from "./routes/orderVnpay/order.js";
import router from "./routes/Contact.js";
// variable

// console.log("test env", process.env.STRIPE_SECRET);
const app = express();
// app
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

// connect DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
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
app.use("/api", routerUpload);
app.use("/api", routerCart);
app.use("/api", routerPayment);
app.use("/api/order", order);
app.use("/api", routerStatus);
app.use("/api", routerBill);
app.use("/api", router);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
