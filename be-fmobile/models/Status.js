import mongoose from "mongoose";
import { ObjectId } from "mongoose";

const statusSchema = new mongoose.Schema({
  idStatus: {
    type: Number,
  },
  nameStatus: {
    type: String,
    maxlength: 50,
    required: true,
  },
});
export default mongoose.model("Status", statusSchema);
