import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["yes", "no"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    },
    // rating: [
    //     {
    //         star: Number,
    //         postedBy: {type: ObjectId, ref: "User"}
    //     }
    // ]
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
