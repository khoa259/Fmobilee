import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const billSchema = new mongoose.Schema(
  {
    images: {
      type: Array,
    },
    count: {
      type: Number,
    },
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
        color: {
          type: String,
        },
      },
    ],

    username: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    status: {
      type: ObjectId,
      ref: "Status",
    },
    tradingCode: {
      type: String,
    },
    cardType: {
      type: String,
    },
    timePayment: {
      type: String,
    },

    billTotal: Number,
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export default mongoose.model("Bill", billSchema);
