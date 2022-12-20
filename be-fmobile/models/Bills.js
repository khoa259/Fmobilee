import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const billSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        title: {
          type: String,
        },
        price: {
          type: Number,
        },
        count: {
          type: Number,
        },
      },
    ],
    status: {
      type: ObjectId,
      ref: "status",
    },
    tradingCode: {
      type: String,
    },
    timePayment: {
      type: String,
    },
    username: {
      type: String,
    },
    address: {
      type: String,
    },
    billTotal: Number,
    orderdBy: { type: ObjectId, ref: "user" },
  },
  { timestamps: true }
);
export default mongoose.model("Bill", billSchema);
