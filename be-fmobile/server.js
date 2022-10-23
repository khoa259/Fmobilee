import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// app
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));

// connect DB
mongoose
  .connect("mongodb://localhost:27017/Fmobile")
  .then(() => console.log("Connect DB success"))
  .catch((err) => console.log("DB connect error", err));

//route
app.get("/api", (req, res) => {
  res.json({
    data: "hey you hit node API",
  });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
