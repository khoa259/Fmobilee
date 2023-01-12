import mongoose from "mongoose";

const contact = new mongoose.Schema(
  {
    nameCustomer: {
      type: String,
      maxLength: 255,
    },
    Phone: {
      type: String,
      maxLength: 255,
    },
    Email: {
      type: String,
    },
    address: {
      type: String,
      maxLength: 255,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Contact", contact);
