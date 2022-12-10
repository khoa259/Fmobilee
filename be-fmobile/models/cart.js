import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: {
          type: Number,
        },
      },
    ],
    cartTotal: {
      type: Number,
      default: 0,
    },
    totalAfterDiscount: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export default mongoose.model("Cart", cartSchema);
