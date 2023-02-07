import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: "name is require",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Category", categorySchema);
