import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const billSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
          price: String,
          colors: String,
          title: String,
        },
        count: {
          type: Number,
        },
        status: {
          type: ObjectId,
          ref: "Status",
        },
      },
    ],
    billTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export default mongoose.model("Bill", billSchema);
