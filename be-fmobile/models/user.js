import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    picture: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    address: {
      type: Object,
    },
    phone: {
      type: String,
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
