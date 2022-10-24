import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subcriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
    // wishlist: [{type: ObjectId, ref: "Product"}],
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
