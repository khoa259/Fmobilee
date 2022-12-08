import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const colorSchema = new mongoose.Schema({
  nameColor: {
    type: String,
    maxlength: 50,
    required: true,
  },
  Status: {
    type: ObjectId,
    ref: "Status",
  },
});
export default mongoose.model("Colors", colorSchema);
